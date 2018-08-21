/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ActionSheetController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { UtilsService } from "../../../../providers/utils.service";
import { Camera } from "@ionic-native/camera";
import {IonicService} from "../../../../providers/ionic.service";
import {MenuPage} from "../../../menu/menu";
import {Profile} from "../../../../model/profile";
import {UploadImageService} from "../../../../providers/uploadImage.service";
import {CollectionTpage} from "../collection-teacher";
import {Card} from "../../../../model/card";
import {CollectionService} from "../../../../providers/collection.service";
import {AppConfig} from "../../../../app/app.config";

declare let google;
declare let cordova;


@Component({
  selector: 'page-create-card',
  templateUrl: './create-card.html'
})
export class CardCreate {

  @ViewChild('map') mapElement: ElementRef;
  public card: Card = new Card();
  public returnedCard: Card = new Card();
  public cardToPost: Card = new Card();
  public profile: Profile;
  public id: string;
  public esUrl: Boolean = true;
  public imageType: string;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public uploadImageService: UploadImageService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    this.id = this.navParams.data.id;
  }

  /**
   * This method create the card and upload the image in case of using
   * the camera or the library of the mobile
   */
  public createCard(): void {
    if(!this.esUrl) {
      this.uploadImageService.uploadImage(this.card.image);
    }
    this.postNewCard(AppConfig.SERVER_URL+/public/+this.card.image);
  }

  /**
   * This method opens the camera or the library aplication of the mobile
   * depending on the selected type of image
   */
  public imageTypeSelected(type: string): void {
    if (type == 'camara'){
      this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
      this.esUrl = false;
    } else if (type == 'libreria'){
      this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
      this.esUrl = false;
    }
  }
  /**
   *
   * Modal that appears when clicking image input
   * Let user select between 2 sources {Library, Camera}
   *
   */
  public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA)
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
  }
  /**
   * This method send the new collection to
   * server and save it on DB
   * @param dbpath
   */
  private postNewCard(dbpath): void {
    this.cardToPost.name=this.card.name;
    this.cardToPost.ratio=this.card.ratio;
    this.cardToPost.rank=this.card.rank;
    this.cardToPost.collectionId=this.id;
    if(this.esUrl){
      this.cardToPost.image = this.card.image;
    } else {
      this.cardToPost.image=dbpath;
    }
    this.collectionService.postCard(this.cardToPost).subscribe(
      response => {
        this.returnedCard = response;
        this.utilsService.presentToast('Card created successfully');
        this.navController.setRoot(MenuPage).then(()=>{
          this.navController.push(CollectionTpage);
        });
      },
      error => {
        this.ionicService.removeLoading();
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }
}
