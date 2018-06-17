import { Component } from '@angular/core';
import { NavParams, MenuController, Refresher, NavController, PopoverController, Platform } from 'ionic-angular';
import { CallNumber, InAppBrowser } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../../providers/ionic.service';
import { UserService } from '../../../providers/user.service';
import { UtilsService } from '../../../providers/utils.service';
import { SchoolService } from '../../../providers/school.service';
import { GroupService } from '../../../providers/group.service';
import { BadgeService } from '../../../providers/badge.service';
import { BadgeRelationService } from '../../../providers/badgeRelation.service';
import { Role } from '../../../model/role';
import { Group } from '../../../model/group';
import { BadgeRelation } from '../../../model/badgeRelation';
import { Teacher } from '../../../model/teacher';
import { Profile } from '../../../model/profile';
import { School } from '../../../model/school';
import { SchoolPage } from '../../pages/school/school';
import { PopoverPage } from '../../pages/home/popover/popover';
import { TeachersPage } from '../../pages/teachers/teachers';
import { StudentsPage } from '../../pages/students/students';
import { GroupPage } from '../../pages/group/group';
import { BadgesPage } from '../../pages/badges/badges';
import { Student } from '../../../model/student';

import { Badge } from '../../../model/badge';


@Component({
  selector: 'page-groupBadge',
  templateUrl: './groupBadge.html'
})

export class GroupBadgePage {

  
  public group: Group;
  public school: School;
  public profile: Profile;
  public student: Student = new Student();
  public badge: Badge = new Badge();
  public studentsCount: number;
  public badgesCount: number;
  public groups: Array<Group>;
  public students: Array<Student>;
  public badges: Array<Badge>;
  public badgeRelation: BadgeRelation = new BadgeRelation();
  public badgeRelationBadge: BadgeRelation = new BadgeRelation();
  public badgeRelations: Array<BadgeRelation>;
  public badgeRelationsBadge: Array<BadgeRelation>;
  public badgeRelationTotal: number;
  
  
  public isDisabledStudent = false;
  public isDisabledBadge = false;
  public studentsBadge = false;
  public studentsBadgeIntro = false;
  public studentsBadgeNo = false;
  public Intro = true

  public badgesBadge=false
  public badgesBadgeIntro = false;


  public myRole: Role;
  public role = Role;
  
  constructor(
    public ionicService: IonicService,
    public userService: UserService,
    public groupService: GroupService,
    public utilsService: UtilsService,
    public badgeService: BadgeService,
    public schoolService: SchoolService,
    public badgeRelationService: BadgeRelationService,
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
    this.getBadges();
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
      this.isDisabledBadge=true
      this.isDisabledStudent=false
  }
  
  private getBadges(): void {	  
    this.schoolService.getMySchoolBadges().finally(() => { }).subscribe(
        ((value: Array<Badge>) => this.badges = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));    
    this.isDisabledStudent=true
    this.isDisabledBadge=false
  }

  private getBadgesStudent(student: Student): void {
    this.studentsBadge=false
    this.student = student
    this.badgeRelationTotal = 0
    this.Intro = false
    this.studentsBadgeIntro=true 
    this.badgesBadgeIntro=false
    this.studentsBadge=true
    this.badgeRelations =  [];
    this.badgesBadge=false 
    this.badgeRelationService.getMyStudentBadges2(this.group.id, student.id).finally(() => { }).subscribe(
      ((value: Array<BadgeRelation>) => {this.badgeRelations = value
        value.forEach(badgeRelation=> {
          this.badgeRelationTotal = this.badgeRelationTotal+(badgeRelation.value*badgeRelation.badge.value)
        });               
        this.studentsBadge=true
        
      }),            
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getBadgesBadge(badge: Badge): void {
    this.badgesBadge=false
    this.badge = badge
    this.badgeRelationTotal = 0
    this.studentsBadgeIntro=false
    this.badgesBadgeIntro=true
    this.Intro = false
    this.badgeRelationsBadge =  [];
    this.studentsBadge=false
    this.badgesBadge=true 
    this.badgeRelationService.getMyBadgeBadges2(this.group.id, badge.id).finally(() => { }).subscribe(
      ((value: Array<BadgeRelation>) => {
        this.badgeRelationsBadge = value                  
      }),            
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  
}
