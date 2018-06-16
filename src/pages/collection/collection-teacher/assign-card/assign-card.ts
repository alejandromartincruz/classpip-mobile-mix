/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  Loading, NavController, NavParams,
  Platform, Refresher
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { CollectionService } from "../../../../providers/collection.service";
import {IonicService} from "../../../../providers/ionic.service";
import {Profile} from "../../../../model/profile";
import {Group} from "../../../../model/group";
import {GroupService} from "../../../../providers/group.service";
import {Student} from "../../../../model/student";
import {Card} from "../../../../model/card";
import {CardAssignStudent} from "./assign-card-student/assign-card-student";

declare let google;
declare let cordova;


@Component({
  selector: 'page-assign-card',
  templateUrl: './assign-card.html'
})
export class CardAssign {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public cards: Array<Card> = Array<Card>();
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

    this.collectionCard.id = this.navParams.data.collectionId;
    this.groups = this.navParams.data.groups;
    this.cards = this.navParams.data.cards;
  }

  public selectGroup(groupId) {
    this.groupService.getMyGroupStudents(groupId).subscribe(
      ((value: Array<Student>) => this.navController.push(CardAssignStudent, { students: value, collectionId: this.collectionCard.id, cards: this.cards })
      ),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error))
  }
}
