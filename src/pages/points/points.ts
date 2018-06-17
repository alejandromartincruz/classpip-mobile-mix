import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { SchoolService } from '../../providers/school.service';
import { UtilsService } from '../../providers/utils.service';
import { PointService } from '../../providers/point.service';
import { PointRelationService } from '../../providers/pointRelation.service';
import { PointPage } from './point/point';
import { Point } from '../../model/point';
import { PointRelation } from '../../model/pointRelation';
import { Role } from '../../model/role';
import { School } from '../../model/school';

@Component({
  selector: 'page-points',
  templateUrl: './points.html'
})

export class PointsPage {

  public createPoint: Point = new Point();
  public school: School;
  public points: Array<Point>;
  public pointsCount: number;
  public pointRelations: Array<PointRelation>;
  public pointRelation: PointRelation;
  public isDisabled = true;
  public enablePostPoint = false;

  public myRole: Role;
  public role = Role;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public utilsService: UtilsService,
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public translateService: TranslateService) {


    this.createPoint.name = 'Excelente en Examen';
    this.createPoint.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzYOexxFJGkbWQ5Hx33loFtjYHZvgOgEthwd5FvWOFmARH-DyOW8fg9g';
    this.createPoint.value = 1;
    this.createPoint.id = '100008';
    this.createPoint.schoolId = 1;
    this.createPoint.teacherId = 1000;

    this.points = this.navParams.data.points;
    this.myRole = this.utilsService.role;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.ionicService.removeLoading();
	this.getPointsCount();
	this.getPoints();
  this.schoolService.getMySchool().finally(() => {}).subscribe(
		((value: School) => {
		  this.school = value
    }))
  }

  /**
   * GetPointPage
   */
  public getPoint(): void {
    this.navController.push(PointPage)
  }

  private getPoints(refresher?: Refresher): void {
  this.schoolService.getMySchoolPoints().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Point>) => this.points = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getPointsRelation(): void {
  this.pointRelationService.getPointRelation().subscribe(
      ((value: Array<PointRelation>) => this.pointRelations = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      this.isDisabled=false
  }
   private getPointsRelation2(): void {
     this.isDisabled=true
  }

  private getPostPoint(): void {
     this.enablePostPoint=true
  }

  private getPointsCount(refresher?: Refresher): void {
  this.schoolService.getMySchoolPointsCount().finally(() => {
              refresher ? refresher.complete() : null;
              this.ionicService.removeLoading();
              }).subscribe(
                ((value: number) => this.pointsCount = value),
                error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
  /**
   * Method called from the home page to open the list of the
   * students of the school of the current user
   */
  public goToPointDetail(point: Point): void {
    this.navController.push(PointPage, { point: point })
  }

  private postPoint(): void {
    this.pointService.savePoint(this.createPoint.name, this.createPoint.value, this.createPoint.image).subscribe(
      response => {
        this.enablePostPoint = false
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });


    /*this.pointService.postPoint(this.createPoint).subscribe(
      response => {
        this.enablePostPoint=false
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });   */
  }

  private deletePoint(): void{
    this.pointRelationService.deletePointRelationsSchool(this.school.id).subscribe(
    response => {
    },
    error => {
      this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
    });
  }

}
