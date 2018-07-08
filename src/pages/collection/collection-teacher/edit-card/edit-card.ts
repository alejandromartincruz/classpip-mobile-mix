/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { Camera } from "@ionic-native/camera";
import { CollectionService } from "../../../../providers/collection.service";
import { IonicService } from "../../../../providers/ionic.service";
import { Profile } from "../../../../model/profile";
import { Group } from "../../../../model/group";
import { MenuPage } from "../../../menu/menu";
import { UserService } from "../../../../providers/user.service";
import { UploadImageService } from "../../../../providers/uploadImage.service";
import {CollectionTpage} from "../collection-teacher";
import {Card} from "../../../../model/card";
import {AppConfig} from "../../../../app/app.config";

declare let google;
declare let cordova;


@Component({
  selector: 'page-edit-card',
  templateUrl: './edit-card.html'
})
export class CardEdit {

  @ViewChild('map') mapElement: ElementRef;
  public card: Card = new Card();
  public cardToPost: Card = new Card();
  public profile: Profile;
  public groups: Array<Group>;
  oldImage: string = null;


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
    public platform: Platform,
    ) {
    this.card = this.navParams.data.card;
    this.oldImage = this.card.image;
  }

  public editCard(): void {
    if(this.oldImage===this.card.image){
      let dbpath = this.oldImage;
      try{
        this.putNewCard(dbpath);
      }
      catch(error){
        alert(error);
      }
    }
    else{
      this.uploadImageService.uploadImage(this.card.image);
      this.putNewCard(AppConfig.SERVER_URL+/public/+this.card.image);
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
      title: this.translateService.instant('IMAGE.IMGSOURCE'),
      buttons: [
        {
          text: this.translateService.instant('IMAGE.LOADFROM'),
          handler: () => {
            this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: this.translateService.instant('IMAGE.CAMERA'),
          handler: () => {
            this.card.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: this.translateService.instant('COMMON.CANCEL'),
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
  public putNewCard(dbpath): void {
    this.cardToPost.name=this.card.name;
    this.cardToPost.ratio=this.card.ratio;
    this.cardToPost.rank=this.card.rank;
    this.cardToPost.image=dbpath;
    this.cardToPost.id=this.card.id;
    this.collectionService.editCard(this.cardToPost).subscribe(
      response => {
        this.utilsService.presentToast(this.translateService.instant('CREATE-COLLECTION.OK'));
        this.navController.setRoot(MenuPage).then(()=>{
          this.navController.push(CollectionTpage);
        });        },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }

}
