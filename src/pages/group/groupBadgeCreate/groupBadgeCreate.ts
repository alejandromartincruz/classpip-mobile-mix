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
  selector: 'page-groupBadgeCreate',
  templateUrl: './groupBadgeCreate.html'
})

export class GroupBadgeCreatePage {

  // TODO: No utilizada, la dejamos por si os va bien

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
  public badgeRel: BadgeRelation


  public badgeCompleted = false;
  public studentCreate = false;
  public isDisabledStudent = true;
  public isDisabledBadge = false;
  public badgeCreate = false;
  public Intro = true
  public myRole: Role;
  public role = Role;
  public createSchoolId = '0';
  public createStudentId = '0';
  public createGroupId = '0';
  public createBadgeId = '0';
  public createValue;

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

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.getEnter();
    this.getBadges();
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

  /**
   * Get the students of the current group
   */
  private getStudents(): void {
    this.groupService.getMyGroupStudents(this.group.id).finally(() => {}).subscribe(
      ((value: Array<Student>) => this.students = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Get the badges of the current school
   */
  private getBadges(): void {
    this.schoolService.getMySchoolBadges().finally(() => { }).subscribe(
        ((value: Array<Badge>) => this.badges = value),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private getStudent(student: Student): void {
    this.student = student
    this.studentCreate = true
    this.isDisabledStudent = true;
    this.badgeCompleted=true;
    this.createStudentId = this.student.id;
  }

  private getBadge(badge: Badge): void {
    this.badge = badge
    this.badgeCreate=true
    this.isDisabledStudent = false;
    this.isDisabledBadge = true;
    this.createBadgeId = this.badge.id;
    this.createValue = 1;
  }

  /**
   * sed to get all the data needed in page
   */
  private createBadge(): void {
    this.createValue = 1;
    this.badgeRelationService.postBadgeRelation(this.createBadgeId, this.createStudentId, this.createSchoolId, this.createGroupId, this.createValue).subscribe(
      response => {
        this.isDisabledStudent = true;
        this.isDisabledBadge = false;
        this.badgeCompleted=false;
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }
}
