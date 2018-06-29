import {Component} from "@angular/core";
import {Student} from "../../../model/student";
import {MenuController, NavController, NavParams, Platform, PopoverController} from "ionic-angular";
import {PointService} from "../../../providers/point.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Point} from "../../../model/point";
import {SchoolService} from "../../../providers/school.service";
import {School} from "../../../model/school";
import {IonicService} from "../../../providers/ionic.service";
import {Profile} from "../../../model/profile";
import {PointRelationService} from "../../../providers/pointRelation.service";
import {PointRelation} from "../../../model/pointRelation";
import {Role} from "../../../model/role";
import {GroupService} from "../../../providers/group.service";
import {UtilsService} from "../../../providers/utils.service";
import {UserService} from "../../../providers/user.service";
import {Group} from "../../../model/group";
import {StudentWithPoints} from "../../../model/studentWithPoints";

@Component({
  selector: 'page-listStudentTotals',
  templateUrl: './listStudentTotals.html'
})

export class listStudentTotalsPage {
  public group: Group;
  public school: School;
  public profile: Profile;
  public student: Student = new Student();
  public point: Point = new Point();
  public studentsCount: number;
  public pointsCount: number;
  public groups: Array<Group>;
  public students: Array<Student>;
  public points: Array<Point>;
  public pointRelation: PointRelation = new PointRelation();
  public pointRelationPoint: PointRelation = new PointRelation();
  public pointRelations: Array<PointRelation>;
  public pointRelationsPoint: Array<PointRelation>;
  public pointRelationTotal: number;


  public isDisabledStudent = false;
  public isDisabledPoint = false;
  public studentsPoint = false;
  public studentsPointIntro = false;
  public studentsPointNo = false;
  public Intro = true

  public pointsPoint=false
  public pointsPointIntro = false;

  public studentWithPointsArray: Array<StudentWithPoints> = new Array<StudentWithPoints>();
  public studentWithPointsArraySorted: Array<StudentWithPoints>;
  public myRole: Role;
  public role = Role;

  constructor(
    public ionicService: IonicService,
    public userService: UserService,
    public groupService: GroupService,
    public utilsService: UtilsService,
    public pointService: PointService,
    public schoolService: SchoolService,
    public pointRelationService: PointRelationService,
    public platform: Platform,
    public translateService: TranslateService,
    public popoverController: PopoverController,
    public menuController: MenuController,
    public navController: NavController,
    public navParams: NavParams) {

    this.students = this.navParams.data.students;
    this.group = this.navParams.data.group;
    this.myRole = this.utilsService.role;

  }


  public ionViewDidEnter(): void {
    this.getPoints();
    for(let stu of this.students){
      this.getPointsStudent(stu);
    }
    this.studentWithPointsArray = new Array<StudentWithPoints>();
    this.studentWithPointsArraySorted = this.studentWithPointsArray.sort((a,b) => a.totalPoints-b.totalPoints);
    this.myRole = this.utilsService.role;
    this.ionicService.removeLoading();
  }

  private getPoints(): void {
    this.schoolService.getMySchoolPoints().finally(() => { }).subscribe(
      ((value: Array<Point>) => this.points = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    this.isDisabledStudent=true
    this.isDisabledPoint=false
  }

  private getPointsStudent(student: Student): void {
    this.pointRelationTotal = 0;
    /*this.pointRelationService.getMyStudentPoints2(this.group.id, student.id).finally(() => { }).subscribe(
      ((value: Array<PointRelation>) => {
        this.pointRelations = value;
        value.forEach(pointRelation=> {
          this.pointRelationTotal = this.pointRelationTotal+(pointRelation.value*pointRelation.point.value)
        });
         this.studentWithPointsArray.push(new StudentWithPoints(student, this.pointRelationTotal));

      }),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });*/
      let studentWpoint: StudentWithPoints = new StudentWithPoints();
      studentWpoint.student = student;
      studentWpoint.totalPoints = 0;
      this.pointRelationService.getStudentPoints(student.id).subscribe(
        ((valuePoints: Array<PointRelation>) => {
          for (let rel of valuePoints) {
            this.pointService.getPoint(rel.pointId).subscribe(
              ((valuep: Point) => {
                studentWpoint.totalPoints += valuep.value * rel.value;
                //this.pointRelationTotal += valuep.value * rel.value;
                //this.ionicService.showAlert("", this.pointRelationTotal.toString());
              }))
          }
          //this.ionicService.showAlert("", this.pointRelationTotal.toString());
          this.studentWithPointsArray.push(studentWpoint);
        }),
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });

  }

}
