import { Component, ViewChild, ElementRef } from '@angular/core';
import { Refresher, NavParams, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {IonicService} from "../../../../providers/ionic.service";
import {Card} from "../../../../model/card";
import {CollectionCard} from "../../../../model/collectionCard";
import {Badge} from "../../../../model/badge";
import {BadgeService} from "../../../../providers/badge.service";


declare var google;


@Component({
  selector: 'page-collection-student-detail',
  templateUrl: './collection-student-detail.html'
})
export class CollectionStudentDetail {

  @ViewChild('map') mapElement: ElementRef;
  public cards: Array<Card>;
  public collectionCard: CollectionCard;
  public grid: Array<Array<Card>>; //array of arrays
  private elements: number = 2;
  public id: string;
  public numCardsBlack: number = 0;
  public numCards: number = 0;
  public hayBadges: Boolean;
  public badgeItem: Badge = new Badge();

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public collectionService: CollectionService,
    public ionicService: IonicService,
    public navController: NavController,
    public badgeService: BadgeService) {

    this.cards = this.navParams.data.cards;
    this.collectionCard = this.navParams.data.collectionCard;
    this.numCardsBlack = this.navParams.data.numCards;
    this.grid = Array(Math.ceil(this.cards.length / this.elements));
    this.numCards = +this.collectionCard.num - this.numCardsBlack;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    if(this.collectionCard.badgeId != "" && typeof this.collectionCard.badgeId != 'undefined') {
      this.getBadge();
    }
    this.prepareGrid();

    this.ionicService.removeLoading();
  }

  /**
   * This method converts an array of students into a
   * col-row matrix for being displayed into a grid
   */
  private prepareGrid(): void {
    let rowNum = 0;
    for (let i = 0; i < this.cards.length; i += this.elements) {
      this.grid[rowNum] = Array(this.elements);
      for (let y = 0; y < this.elements; y++) {
        if (this.cards[i + y]) {
          this.grid[rowNum][y] = this.cards[i + y];
        }
      }
      rowNum++;
    }
  }

  /**
   * This method gets the badge assosiated to the collection
   */
  public getBadge(): void {
    this.badgeService.getBadge(+this.collectionCard.badgeId).subscribe(
      ((value2: Badge) => {
        this.badgeItem = value2;
        this.hayBadges = true;
      }),
      error => {
        //this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        this.hayBadges = false;
      });
  }
}
