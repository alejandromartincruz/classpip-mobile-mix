import { Component, ViewChild, ElementRef } from '@angular/core';
import { Refresher, NavParams, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {CollectionCard} from "../../../model/collectionCard";
import {IonicService} from "../../../providers/ionic.service";
import {CollectionStudentDetail} from "./collection-student-detail/collection-student-detail";
import {Card} from "../../../model/card";
import {UtilsService} from "../../../providers/utils.service";
import {BadgeRelationService} from "../../../providers/badgeRelation.service";
import {GroupService} from "../../../providers/group.service";
import {Group} from "../../../model/group";
import {BadgeRelation} from "../../../model/badgeRelation";
import {error} from "util";


declare let google;


@Component({
  selector: 'page-collection-student',
  templateUrl: './collection-student.html'
})
export class CollectionSpage {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCards: Array<CollectionCard>;
  public completada: Boolean= true;
  public numCards: number = 0;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public collectionService: CollectionService,
    public ionicService: IonicService,
    public navController: NavController,
    public utilsServices: UtilsService,
    public badgeRelationService: BadgeRelationService,
    public groupServices: GroupService) {

  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.getCollections();
  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} Refresher element
   */
  private getCollections(refresher?: Refresher): void {
    this.collectionService.getMyCollections().finally(() => {
      refresher ? refresher.complete() : null;
      this.ionicService.removeLoading();
    }).subscribe(
      ((value: Array<CollectionCard>) => this.collectionCards = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Method called from the collections page to open the list of the
   * cards of the current collection
   */
  public goToCollectionDetail(collectionCard): void {
    this.completada = true;
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));
    this.collectionService.getCollectionDetails(collectionCard.id).subscribe(
      ((value: Array<Card>)=> {
        let allCards : Array<Card> = value;
        let assignedCardsIds = Array();
        let finalCards = Array<Card>();
        let unknownCard = new Card();
        unknownCard.name=this.translateService.instant('COMMON.UNKNOWN');
        unknownCard.rank=this.translateService.instant('COMMON.UNKNOWN');
        unknownCard.image="https://image.flaticon.com/icons/png/512/37/37232.png";
        this.collectionService.getAssignedCards().subscribe((assignedCards: Array<Card>)=> {
          assignedCards.forEach((assignedCard) => {
            assignedCardsIds.push(assignedCard.id);
          });
          allCards.forEach((allCard) => {
            if (assignedCardsIds.indexOf(allCard.id) == -1) {
              finalCards.push(unknownCard);
              this.numCards++;
            }
            else {
              finalCards.push(allCard);
            }
          });
          this.navController.push(CollectionStudentDetail, {cards: finalCards, collectionCard: collectionCard, numCards: this.numCards});

      },
      error => {
        //this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    }),
    error =>
      this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.ionicService.removeLoading();
  }
}
