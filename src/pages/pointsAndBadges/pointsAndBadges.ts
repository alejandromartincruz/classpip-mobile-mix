import {Component} from "@angular/core";
import {MenuController, NavController, NavParams, Platform, Refresher} from "ionic-angular";
import {TranslateService} from "ng2-translate/ng2-translate";
import {UserService} from "../../providers/user.service";
import {IonicService} from "../../providers/ionic.service";
import {AvatarService} from "../../providers/avatar.service";
import {BadgeRelation} from "../../model/badgeRelation";
import {Role} from "../../model/role";
import {UtilsService} from "../../providers/utils.service";
import {BadgeRelationService} from "../../providers/badgeRelation.service";
import {SchoolService} from "../../providers/school.service";
import {BadgeService} from "../../providers/badge.service";
import {School} from "../../model/school";
import {Badge} from "../../model/badge";
import {Point} from "../../model/point";
import {Page} from "../../model/page";
import {PointPage} from "./pointDetails/point";
import {BadgePage} from "./badgeDetail/badge";
import {PointRelationService} from "../../providers/pointRelation.service";
import {PointRelation} from "../../model/pointRelation";
import {PointService} from "../../providers/point.service";
import {PointPointRelation} from "../../model/pointPointRelation";
import {BadgeBadgeRelation} from "../../model/badgeBadgeRelation";
import {AssignPointsPage} from "./assignPoints/assignPoints";
import {AssignBadgesPage} from "./assignBadges/assignBadges";
import {Group} from "../../model/group";
import {GroupService} from "../../providers/group.service";

@Component({
  selector: 'page-pointsAndBadges',
  templateUrl: './pointsAndBadges.html'
})

export class PointsAndBadgesPage {
  public createBadge: Badge = new Badge();
  public createPoint: Point = new Point();
  public pointsCount: number;
  public totalPointsStudent: number = 0;
  public totalBadgesStudent: number = 0;

  public school: School;
  public badges: Array<Badge>;
  public points: Array<Point>;
  public groupsArray: Array<Group> = new Array<Group>();
  public badgesCount: number;
  public badgeRelation: BadgeRelation;
  public isDisabled = true;

  public enablePostPoint = false;
  public enablePostBadge = false;
  public enableAssignPoints = false;
  public enableAssignBadges = false;

  public pointRelationArray: Array<PointRelation> = new Array<PointRelation>();
  public badgeRelationsArray: Array<BadgeRelation>;
  public badgesArray: Array<Badge> = new Array<Badge>();
  public pointArray: Array<Point> = new Array<Point>();
  public pointPointRelationArray: Array<PointPointRelation> = new Array<PointPointRelation>();
  public badgeBadgeRelationArray: Array<BadgeBadgeRelation> = new Array<BadgeBadgeRelation>();
  selectedStudents: Array<Point>;

  public myRole: Role;
  public role = Role;

  //public pointPage: Page;
  //public badgPage: Page;

  public esPuntos: Boolean;

  icons:string;// = "points";


  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public utilsService: UtilsService,
    public badgeService: BadgeService,
    public badgeRelationService: BadgeRelationService,
    public translateService: TranslateService,
    public pointRelationService: PointRelationService,
    public pointService: PointService,
    public groupService: GroupService) {

    //this.badges = this.navParams.data.badges;
    //this.points = this.navParams.data.point;
    this.myRole = this.utilsService.role;

    //this.pointPage = new Page(PointPage, this.translateService.instant('POINTS.TITLE'));
    //this.badgPage = new Page(BadgePage, this.translateService.instant('BADGES.TITLE'));


  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.getInfo();
    this.ionicService.removeLoading();
  }

  /**
   * This method returns the school information from the
   * backend. This call is called on the constructor or the
   * refresh event
   * @param {Refresher} Refresher element
   */
  private getInfo(refresher?: Refresher): void {
    if(this.myRole == this.role.STUDENT) {
      this.totalPointsStudent = 0;
      this.pointRelationService.getStudentPointsBien().finally(() => {
        refresher ? refresher.complete() : null;
        this.ionicService.removeLoading();
      }).subscribe(
        ((value: Array<PointRelation>) => {
          this.pointRelationArray = value;
          this.pointRelationArray.sort(function(a,b){return a.pointId - b.pointId});
          for (let point of this.pointRelationArray) {
            this.pointService.getPoint(+point.pointId).subscribe(
              ((value2: Point) => {
                this.totalPointsStudent += value2.value * point.value;
                this.pointPointRelationArray.push(new PointPointRelation(value2, point));
                //this.pointArray.push(value2);
              })
            )
          }
        }),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

      this.totalBadgesStudent = 0;
      this.badgeRelationService.getStudentBadgesBien().finally(() => {
        refresher ? refresher.complete() : null;
        this.ionicService.removeLoading();
      }).subscribe(
        ((value: Array<BadgeRelation>) => {
          this.badgeRelationsArray = value;
          for (let badge of value) {
            this.badgeService.getBadge(+badge.badgeId).subscribe(
              ((value2: Badge) => {
                //this.badgesArray.push(value2);
                this.totalBadgesStudent += 1;
                this.badgeBadgeRelationArray.push(new BadgeBadgeRelation(value2, badge));
              })
            )
          }
        }),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    } else if(this.myRole == this.role.TEACHER){

      this.getPointsCount(refresher);
      this.getBadgesCount(refresher);
      this.getPoints(refresher);
      this.getBadges(refresher);

      this.schoolService.getMySchoolPoints().finally(() => {
        refresher ? refresher.complete() : null;
      }).subscribe(
        ((value: Array<Point>) => this.points = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      this.groupService.getMyGroups().subscribe(
        ((value: Array<Group>) => this.groupsArray = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    }
  }

  private goToGroup(group: string): void{

  }

  private getPostBadge(): void {
    this.enablePostBadge? this.enablePostBadge = false: this.enablePostBadge = true;
  }

  private getPostPoint(): void{
    this.enablePostPoint? this.enablePostPoint = false: this.enablePostPoint = true;
  }

  private getAssignPoint(): void{
    this.enableAssignPoints? this.enableAssignPoints = false: this.enableAssignPoints = true;
  }

  private postPoint(): void {
    this.pointService.savePoint(this.createPoint.name, this.createPoint.value, this.createPoint.image).subscribe(
      response => {
        this.enablePostPoint = false
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    this.createPoint = new Point();
  }

  private postBadge(): void {
    this.badgeService.saveBadge(this.createBadge.name, this.createBadge.value, this.createBadge.image).subscribe(
      response => {
        this.enablePostBadge=false
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    this.createBadge = new Badge();
  }

  private assignPoint():void{

  }

  private getPoints(refresher?: Refresher): void {
    this.schoolService.getMySchoolPoints().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Point>) => this.points = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
  private getBadges(refresher?: Refresher): void {
    this.schoolService.getMySchoolBadges().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Badge>) => this.badges = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
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

  private getBadgesCount(refresher?: Refresher): void {
    this.schoolService.getMySchoolBadgesCount().finally(() => {
      refresher ? refresher.complete() : null;
      this.ionicService.removeLoading();
    }).subscribe(
      ((value: number) => this.badgesCount = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
  /**
   * Method called from the home page to open the list of the
   * students of the school of the current user
   */
  public goToBadgeDetail(badge: Badge): void {
    this.navController.push(BadgePage, { badge: badge })
  }


  public goToAssignPointsPage(): void {
    this.navController.push(AssignPointsPage, {groupsArray: this.groupsArray});
  }

  public goToAssignBadgesPage(): void {
    this.navController.push(AssignBadgesPage, {groupsArray: this.groupsArray});
  }
}
