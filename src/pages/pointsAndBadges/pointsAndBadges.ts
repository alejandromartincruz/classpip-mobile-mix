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
import {PointPage} from "../points/point/point";
import {BadgePage} from "../badges/badge/badge";
import {PointRelationService} from "../../providers/pointRelation.service";
import {PointRelation} from "../../model/pointRelation";
import {PointService} from "../../providers/point.service";

@Component({
  selector: 'page-pointsAndBadges',
  templateUrl: './pointsAndBadges.html'
})

export class PointsAndBadgesPage {
  public createBadge: Badge = new Badge();
  public school: School;
  public badges: Array<Badge>;
  public points: Array<Point>;
  public badgesCount: number;
  public badgeRelation: BadgeRelation;
  public isDisabled = true;
  public enablePostBadge = false;

  public pointRelationArray: Array<PointRelation>;
  public badgeRelationsArray: Array<BadgeRelation>;
  public badgesArray: Array<Badge> = new Array<Badge>();
  public pointArray: Array<Point> = new Array<Point>();

  public myRole: Role;
  public role = Role;

  public pointPage: Page;
  public badgPage: Page;

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
    public pointService: PointService) {

    this.badges = this.navParams.data.badges;
    this.points = this.navParams.data.point;
    this.myRole = this.utilsService.role;

    this.pointPage = new Page(PointPage, this.translateService.instant('POINTS.TITLE'));
    this.badgPage = new Page(BadgePage, this.translateService.instant('BADGES.TITLE'));


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
      this.pointRelationService.getStudentPointsBien().subscribe(
        ((value: Array<PointRelation>) => {
          this.pointRelationArray = value;
          for (let point of value) {
            this.pointService.getPoint(+point.pointId).subscribe(
              ((value2: Point) => {
                this.pointArray.push(value2);
              })
            )
          }

        }),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

      this.badgeRelationService.getStudentBadgesBien().subscribe(
        ((value: Array<BadgeRelation>) => {
          this.badgeRelationsArray = value;
          for (let badge of value) {
            this.badgeService.getBadge(+badge.badgeId).subscribe(
              ((value2: Badge) => {
                this.badgesArray.push(value2);
              })
            )
          }

        }),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    }
  }


  public selectedBadges(refresher?: Refresher):void{
    this.esPuntos = false;

  }

  public selectedPoints(refresher?: Refresher): void{
    this.esPuntos = true;

  }

}
