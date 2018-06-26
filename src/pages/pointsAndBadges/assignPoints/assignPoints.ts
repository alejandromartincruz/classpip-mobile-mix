import {SchoolService} from "../../../providers/school.service";
import {IonicService} from "../../../providers/ionic.service";
import {BadgeRelationService} from "../../../providers/badgeRelation.service";
import {PointRelationService} from "../../../providers/pointRelation.service";
import {NavController, NavParams, Refresher, ToastController} from "ionic-angular";
import {PointService} from "../../../providers/point.service";
import {UtilsService} from "../../../providers/utils.service";
import {BadgeService} from "../../../providers/badge.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Role} from "../../../model/role";
import {Component} from "@angular/core";
import {Group} from "../../../model/group";
import {GroupService} from "../../../providers/group.service";
import {Student} from "../../../model/student";
import {StudentsSelected} from "../../../model/studentsSelected";
import {Point} from "../../../model/point";

@Component({
  selector: 'page-assignPoints',
  templateUrl: './assignPoints.html'
})
export class AssignPointsPage{
  groupsArraySelected: Array<Group> = new Array<Group>() ;
  studentsArraySelected: Array<Student> = new Array<Student>();
  pointArraySelected: Array<Point> = new Array<Point>();

  public myRole: Role;
  public role = Role;

  public groupsArray: Array<Group> = new Array<Group>();
  public studentsArray: Array<Student> = new Array<Student>();
  public studentsSelectedArray: Array<StudentsSelected> = new Array<StudentsSelected>();
  public pointArray: Array<Point> = new Array<Point>();

  public showStudents: Boolean = false;

  public groupSelected: string;
  public valueRel: number;
  public pointSelected: string;
  public instruction: Boolean = true;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public utilsService: UtilsService,
    public groupService: GroupService,
    public badgeService: BadgeService,
    public badgeRelationService: BadgeRelationService,
    public translateService: TranslateService,
    public pointRelationService: PointRelationService,
    public pointService: PointService,
    public toastCtrl: ToastController) {

    //this.badges = this.navParams.data.badges;
    //this.points = this.navParams.data.point;
    this.myRole = this.utilsService.role;
    //this.groupsArray = this.navParams.data.groups;
    //this.pointPage = new Page(PointPage, this.translateService.instant('POINTS.TITLE'));
    //this.badgPage = new Page(BadgePage, this.translateService.instant('BADGES.TITLE'));


  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.newRelation();
    this.getInfo();
    this.ionicService.removeLoading();
  }

  public pointsSend(text: string) {

    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  public newRelation(): void {
    this.groupsArraySelected = new Array<Group>();
    this.pointArraySelected = new Array<Point>();
    this.studentsArray = new Array<Student>();
    this.pointArray = new Array<Point>();
    this.groupSelected = "";
    this.valueRel = 0;
    this.pointSelected = "";
    this.instruction = true;
  }

  public getInfo(): void {
    this.groupService.getMyGroups().subscribe(
      ((value: Array<Group>) => this.groupsArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.schoolService.getMySchoolPoints().subscribe(
      ((value: Array<Point>) => this.pointArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public showselected(groupsSelected: string, refresher: Refresher): void {
    this.groupSelected = groupsSelected;
    this.groupService.getMyGroupStudents(groupsSelected).finally(() => {
      refresher ? refresher.complete() : null;
      this.ionicService.removeLoading();
    }).subscribe(
      ((value: Array<Student>) =>{
       this.studentsArray = value;
       for(let obj of value){
         this.studentsSelectedArray.push(new StudentsSelected(obj, false));
       }


    }),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    this.showStudents = true;

  }

  public refresh(groupsSelected: string, point: string, refresher: Refresher){
    this.groupSelected = groupsSelected;
    if(groupsSelected != ""){
      this.instruction = false;
      this.showselected(groupsSelected, refresher);
    }
    if(point != ""){
      this.getSelectedPoint(point);
    }
    refresher ? refresher.complete() : null;
    this.ionicService.removeLoading();
  }

  public getSelectedPoint(point: string): void {
    this.pointSelected = point;
  }

  public getSelectedStudents(stuArray: Array<StudentsSelected>){
    this.studentsSelectedArray = stuArray;
  }

  public postPointsToStudents(): void {
    let corr: Boolean = true;
    for(let st of this.studentsSelectedArray) {
      if(st.selected) {
        this.pointRelationService.postPointRelation(this.pointSelected, st.student.id, st.student.schoolId.toString(), this.groupSelected, this.valueRel).subscribe(
          response => {
          },
          error => {
            this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
          });
      }
    }
    if(corr){
      this.newRelation();
      this.ionicService.showAlert("",this.translateService.instant('POINTS.CORASSIGN'));
    }

  }

}
