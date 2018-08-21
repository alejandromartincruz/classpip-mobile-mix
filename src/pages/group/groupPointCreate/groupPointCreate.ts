import { Component } from '@angular/core';
import { NavParams, MenuController, Refresher, NavController, PopoverController, Platform } from 'ionic-angular';
import { CallNumber, InAppBrowser } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../../providers/ionic.service';
import { UserService } from '../../../providers/user.service';
import { UtilsService } from '../../../providers/utils.service';
import { SchoolService } from '../../../providers/school.service';
import { GroupService } from '../../../providers/group.service';
import { PointService } from '../../../providers/point.service';
import { PointRelationService } from '../../../providers/pointRelation.service';
import { Role } from '../../../model/role';
import { Group } from '../../../model/group';
import { PointRelation } from '../../../model/pointRelation';
import { Teacher } from '../../../model/teacher';
import { Profile } from '../../../model/profile';
import { School } from '../../../model/school';
import { SchoolPage } from '../../pages/school/school';
import { PopoverPage } from '../../pages/home/popover/popover';
import { TeachersPage } from '../../pages/teachers/teachers';
import { StudentsPage } from '../../pages/students/students';
import { GroupPage } from '../../pages/group/group';
import { PointsPage } from '../../pages/points/points';
import { Student } from '../../../model/student';

import { Point } from '../../../model/point';


@Component({
  selector: 'page-groupPointCreate',
  templateUrl: './groupPointCreate.html'
})

export class GroupPointCreatePage {

  // TODO: No utilizada, la dejamos por si os va bien

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
  public pointRel: PointRelation


  public pointCompleted = false;
  public studentCreate = false;
  public isDisabledStudent = true;
  public isDisabledPoint = false;
  public pointCreate = false;
  public Intro = true
  public myRole: Role;
  public role = Role;
  public createSchoolId = '0';
  public createStudentId = '0';
  public createGroupId = '0';
  public createPointId = '0';
  public createValue;

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
    this.getEnter();
    this.getPoints();
    this.getStudents();
    this.ionicService.removeLoading();

    this.myRole = this.utilsService.role;
  }

  private getEnter(): void {
    this.schoolService.getMySchool().finally(() => {}).subscribe(
		((value: School) => {
		  this.school = value
      this.createSchoolId = this.school.id;
      this.createGroupId = this.navParams.data.group.id;
    }))
  }

  private getStudents(): void {
    this.groupService.getMyGroupStudents(this.group.id).finally(() => {}).subscribe(
      ((value: Array<Student>) => this.students = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getPoints(): void {
    this.schoolService.getMySchoolPoints().finally(() => { }).subscribe(
        ((value: Array<Point>) => this.points = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getStudent(student: Student): void {
    this.student = student
    this.studentCreate = true
    this.isDisabledStudent = true;
    this.pointCompleted=true;
    this.createStudentId = this.student.id;
  }

  private getPoint(point: Point): void {
    this.point = point
    this.pointCreate=true
    this.isDisabledStudent = false;
    this.isDisabledPoint = true;
    this.createPointId = this.point.id;
    this.createValue = 1;
  }
  private createPoint(): void {
    this.createValue = 1;
    this.pointRelationService.postPointRelation(this.createPointId, this.createStudentId, this.createSchoolId, this.createGroupId, this.createValue).subscribe(
      response => {
        this.isDisabledStudent = true;
        this.isDisabledPoint = false;
        this.pointCompleted=false;
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }
}
