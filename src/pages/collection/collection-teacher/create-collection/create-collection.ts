/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ActionSheetController, NavController,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { CollectionService } from "../../../../providers/collection.service";
import { Camera } from "@ionic-native/camera";
import {IonicService} from "../../../../providers/ionic.service";
import {MenuPage} from "../../../menu/menu";
import {UserService} from "../../../../providers/user.service";
import {Profile} from "../../../../model/profile";
import {UploadImageService} from "../../../../providers/uploadImage.service";
import {CollectionTpage} from "../collection-teacher";
import {AppConfig} from "../../../../app/app.config";
import {Badge} from "../../../../model/badge";
import {SchoolService} from "../../../../providers/school.service";

declare let google;
declare let cordova;


@Component({
  selector: 'page-create-collection',
  templateUrl: './create-collection.html'
})
export class CollectionCreate {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public collectionToPost: CollectionCard = new CollectionCard();
  public profile: Profile;
  public esUrl: Boolean = true;
  public imageType: string;
  badgeArraySelected: Array<Badge> = new Array<Badge>();
  public badgeArray: Array<Badge> = new Array<Badge>();
  public badgeSelected: string;

  constructor(
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public uploadImageService: UploadImageService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public userService: UserService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public schoolService: SchoolService) {

    this.schoolService.getMySchoolBadges().subscribe(
      ((value: Array<Badge>) => this.badgeArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
  
  /**
   * This method create the collection and upload the image in case of using
   * the camera or the library of the mobile
   */
  public createCollection(): void {
    if (+this.collectionCard.num >= 1) {
      if (!this.esUrl) {
        this.uploadImageService.uploadImage(this.collectionCard.image);
      }
      this.postNewCollection(AppConfig.SERVER_URL + /public/ + this.collectionCard.image);
    } else {
      this.ionicService.showAlert("", this.translateService.instant('VALIDATION.QTY'));
    }
  }

  /**
   * This method opens the camera or the library aplication of the mobile
   * depending on the selected type of image
   */
  public imageTypeSelected(type: string): void {
    if (type == 'camara'){
      this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
      this.esUrl = false;
    } else if (type == 'libreria'){
      this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
      this.esUrl = false;
    }
  }

  public getSelectedBadge(badge: string): void {
    this.badgeSelected = badge;
    this.ionicService.showAlert("", this.badgeSelected);
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
              this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              this.esUrl = false;
            }
          },
          {
            text: this.translateService.instant('IMAGE.CAMERA'),
            handler: () => {
              this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
              this.esUrl = false;
            }
          },
          {
            text: 'Url',
            handler: () => {
              //this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
              this.esUrl = true;
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
  private postNewCollection(dbpath): void {
    this.collectionToPost.name=this.collectionCard.name;
    this.collectionToPost.num=this.collectionCard.num;
    if(this.esUrl){
      this.collectionToPost.image = this.collectionCard.image;
    }else{
      this.collectionToPost.image=dbpath;
    }
    this.collectionToPost.badgeId = this.collectionCard.badgeId;
    this.userService.getMyProfile().finally(() => {
      this.collectionToPost.createdBy = this.profile.username;
      this.collectionService.postCollection(this.collectionToPost).subscribe(
        response => {
          this.utilsService.presentToast(this.translateService.instant('CREATE-COLLECTION.OK'));
          this.navController.setRoot(MenuPage).then(()=>{
            this.navController.push(CollectionTpage);
          });
        },
        error => {
          this.ionicService.removeLoading();
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }).subscribe(
      ((value: Profile) => this.profile = value)
    );
  }
}
