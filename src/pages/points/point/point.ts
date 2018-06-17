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
import { Teacher } from '../../../model/teacher';
import { Profile } from '../../../model/profile';
import { School } from '../../../model/school';
import { SchoolPage } from '../../pages/school/school';
import { PopoverPage } from '../../../pages/home/popover/popover';
import { TeachersPage } from '../../../pages/teachers/teachers';
import { StudentsPage } from '../../../pages/students/students';
import { GroupPage } from '../../../pages/group/group';
import { PointsPage } from '../../../pages/points/points';

import { Point } from '../../../model/point';

@Component({
  selector: 'page-point',
  templateUrl: './point.html'
})

export class PointPage {

  public point: Point;
  public school: School;
  public profile: Profile;
  public studentsCount: number;
  public pointsCount: number;
  public groups: Array<Group>;
  
  public isDisabled = false;
  public myRole: Role;
  public role = Role;
  
  constructor(
    public ionicService: IonicService,
    public userService: UserService,
    public groupService: GroupService,
    public utilsService: UtilsService,
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public schoolService: SchoolService,
    public platform: Platform,
    public translateService: TranslateService,
    public popoverController: PopoverController,
    public menuController: MenuController,
    public navController: NavController,
    public navParams: NavParams) {

    this.point = this.navParams.data.point;
    this.myRole = this.utilsService.role;
    
  }    
  
  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }

  

  public deletePoint(point: Point): void {
    this.pointRelationService.deletePointRelations(this.point.id).subscribe(
      response => {                       		
      },
      error => {        
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    this.pointService.deletePoint(this.point.id).subscribe(
      response => {
       this.isDisabled = true
      },
      error => {        
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });      
  }
  public editPoint(point: Point): void {
    this.isDisabled=true 
  }
}
