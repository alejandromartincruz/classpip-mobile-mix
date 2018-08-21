/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
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
import {CollectionTpage} from "../collection-teacher";
import {MenuPage} from "../../../menu/menu";
import {GroupService} from "../../../../providers/group.service";
import {Student} from "../../../../model/student";

declare let google;
declare let cordova;


@Component({
  selector: 'page-assign-collection',
  templateUrl: './assign-collection.html'
})
export class CollectionAssign {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  loading: Loading;
  public profile: Profile;
  public groups: Array<Group>;
  public students: Array<Student>;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public groupService: GroupService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public platform: Platform,
    ) {

    this.collectionCard.id = this.navParams.data.id;
    this.groups = this.navParams.data.groups;
  }

  /**
   * This method assign a group to the collection
   */
  public assignGroup(collectionId, groupId) {
    this.collectionService.assignCollection(collectionId, groupId).subscribe(
      response => {
        this.groupService.getMyGroupStudents(groupId).subscribe(students => {
          this.students = students;
          this.students.forEach( (element) => {
            this.collectionService.assignCollectionToStudent(element.id, collectionId).subscribe(response => {

            })
          });
          this.utilsService.presentToast(this.translateService.instant('COLLECTIONS-ASSIGNED.OK'));
        });
        this.navController.setRoot(MenuPage).then(()=>{
          this.navController.push(CollectionTpage);
        });
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }
}
