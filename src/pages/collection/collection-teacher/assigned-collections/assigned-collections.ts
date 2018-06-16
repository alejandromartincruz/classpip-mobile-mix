/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  AlertController,
  Loading, NavController, NavParams,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { CollectionService } from "../../../../providers/collection.service";
import {IonicService} from "../../../../providers/ionic.service";
import {Profile} from "../../../../model/profile";
import {Group} from "../../../../model/group";
import {MenuPage} from "../../../menu/menu";
import {CollectionTpage} from "../collection-teacher";

declare let google;
declare let cordova;


@Component({
  selector: 'page-assigned-collections',
  templateUrl: './assigned-collections.html'
})
export class CollectionsAssigned {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  loading: Loading;
  public profile: Profile;
  public groups: Array<Group>;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public alertCtrl: AlertController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public platform: Platform,
    ) {

    this.collectionCard.id = this.navParams.data.id;
    this.groups = this.navParams.data.groups;
  }

  public unassignGroup(collectionId, groupId) {
    let confirm = this.alertCtrl.create({
      title: 'Cancelar la asignación',
      message: 'Si aceptas cancelas la asignación de la colección a este grupo, estás de acuerdo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.collectionService.deleteAssignedGroup(collectionId, groupId).subscribe(
              response => {
                this.utilsService.presentToast('Delete assigned group successfuly');
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
      ]
    });
    confirm.present();

  }
}
