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
import {AppConfig} from "../../../../app/app.config";
import {Badge} from "../../../../model/badge";
import {SchoolService} from "../../../../providers/school.service";
import {BadgeService} from "../../../../providers/badge.service";

declare let google;
declare let cordova;


@Component({
  selector: 'page-edit-collection',
  templateUrl: './edit-collection.html'
})
export class CollectionEdit {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public collectionToPost: CollectionCard = new CollectionCard();
  public profile: Profile;
  public groups: Array<Group>;
  oldImage: string = null;


  public esUrl: Boolean = true;
  public imageType: string;
  //badgeArraySelected: Badge; // Array<Badge> = new Array<Badge>();
  public badgeArray: Array<Badge> = new Array<Badge>();
  public badgeSelected: Badge = new Badge();

  constructor(
    public navParams: NavParams,
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
    public schoolService: SchoolService,
    public badgeService: BadgeService
    ) {
    this.collectionCard = this.navParams.data.collectionCard;
    this.oldImage = this.collectionCard.image;
    this.schoolService.getMySchoolBadges().subscribe(
      ((value: Array<Badge>) => this.badgeArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

  }

  /**
   * This method modifie the image in case of change
   */
  public editCollection(): void {
    if(this.oldImage===this.collectionCard.image){
      let dbpath = this.oldImage;
      try{
        this.putNewCollection(dbpath);
      }
      catch(error){
        alert(error);
      }
    }
    else{
      if(!this.esUrl) {
        this.uploadImageService.uploadImage(this.collectionCard.image);
        //this.putNewCollection(AppConfig.SERVER_URL+/public/+this.collectionCard.image);
      }
      this.putNewCollection(AppConfig.SERVER_URL+/public/+this.collectionCard.image);
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

  public getSelectedBadge(badge: Badge): void {
    this.badgeSelected = badge;
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
          text: 'Load from Library',
          handler: () => {
            this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA);
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
  public putNewCollection(dbpath): void {
    this.collectionToPost.name=this.collectionCard.name;
    this.collectionToPost.num=this.collectionCard.num;
    this.collectionToPost.image=dbpath;
    this.collectionToPost.id=this.collectionCard.id;
    this.collectionToPost.badgeId = this.collectionCard.badgeId;
    this.userService.getMyProfile().finally(() => {
      this.collectionToPost.createdBy = this.profile.username;
      this.collectionService.editCollection(this.collectionToPost).subscribe(
        response => {
          this.utilsService.presentToast(this.translateService.instant('EDIT-COLLECTION.OK'));
          this.navController.setRoot(MenuPage).then(()=>{
            this.navController.push(CollectionTpage);
          });        },
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }).subscribe(
      ((value: Profile) => this.profile = value)
    );
  }

}
