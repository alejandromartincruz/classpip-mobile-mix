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
  selector: 'page-groupPoint',
  templateUrl: './groupPoint.html'
})

export class GroupPointPage {

  
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
    this.getEnter();
    this.getPoints();
    this.ionicService.removeLoading();

    this.myRole = this.utilsService.role;
  }

  private getEnter(): void {
    this.schoolService.getMySchool().finally(() => {}).subscribe(
		((value: School) => {
		  this.school = value            
    }))    
  }  
  
  private getStudents(): void {
    this.groupService.getMyGroupStudents(this.group.id).finally(() => {}).subscribe(
      ((value: Array<Student>) => this.students = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));    
      this.isDisabledPoint=true
      this.isDisabledStudent=false
  }
  
  private getPoints(): void {	  
    this.schoolService.getMySchoolPoints().finally(() => { }).subscribe(
        ((value: Array<Point>) => this.points = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));    
    this.isDisabledStudent=true
    this.isDisabledPoint=false
  }

  private getPointsStudent(student: Student): void {
    this.studentsPoint=false
    this.student = student
    this.pointRelationTotal = 0
    this.Intro = false
    this.studentsPointIntro=true 
    this.pointsPointIntro=false
    this.studentsPoint=true
    this.pointRelations =  [];
    this.pointsPoint=false 
    this.pointRelationService.getMyStudentPoints2(this.group.id, student.id).finally(() => { }).subscribe(
      ((value: Array<PointRelation>) => {this.pointRelations = value
        value.forEach(pointRelation=> {
          this.pointRelationTotal = this.pointRelationTotal+(pointRelation.value*pointRelation.point.value)
        });               
        this.studentsPoint=true
        
      }),            
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getPointsPoint(point: Point): void {
    this.pointsPoint=false
    this.point = point
    this.pointRelationTotal = 0
    this.studentsPointIntro=false
    this.pointsPointIntro=true
    this.Intro = false
    this.pointRelationsPoint =  [];
    this.studentsPoint=false
    this.pointsPoint=true 
    this.pointRelationService.getMyPointPoints2(this.group.id, point.id).finally(() => { }).subscribe(
      ((value: Array<PointRelation>) => {
        this.pointRelationsPoint = value                  
      }),            
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  
}
