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
import { Teacher } from '../../../model/teacher';
import { Profile } from '../../../model/profile';
import { School } from '../../../model/school';
import { SchoolPage } from '../../../pages/school/school';
import { PopoverPage } from '../../../pages/home/popover/popover';
import { TeachersPage } from '../../../pages/teachers/teachers';
import { StudentsPage } from '../../../pages/students/students';
import { GroupPage } from '../../../pages/group/group';
import { BadgesPage } from '../../../pages/badges/badges';

import { Badge } from '../../../model/badge';
import { BadgeRelation } from '../../../model/badgeRelation';

@Component({
  selector: 'page-badge',
  templateUrl: './badge.html'
})

export class BadgePage {

  public badge: Badge;
  public school: School;
  public profile: Profile;
  public studentsCount: number;
  public badgesCount: number;
  public groups: Array<Group>;
  public badgeRelations: Array<BadgeRelation>;
  
  
  public isDisabled = false;
  public myRole: Role;
  public role = Role;
  
  constructor(
    public ionicService: IonicService,
    public userService: UserService,
    public groupService: GroupService,
    public utilsService: UtilsService,
    public badgeService: BadgeService,
    public badgeRelationService: BadgeRelationService,
    public schoolService: SchoolService,
    public platform: Platform,
    public translateService: TranslateService,
    public popoverController: PopoverController,
    public menuController: MenuController,
    public navController: NavController,
    public navParams: NavParams) {

    this.badge = this.navParams.data.badge;
    this.myRole = this.utilsService.role;
    
  }    
  
  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }
  
  public deleteBadge(id: number): void {     
    this.badgeRelationService.deleteBadgeRelations(this.badge.id).subscribe(
    response => {                       		
    },
    error => {        
      this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
    });
    this.badgeService.deleteBadge(this.badge.id).subscribe(
    response => {
      this.isDisabled = true       		
    },
    error => {        
      this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
    });         
  }  
}
