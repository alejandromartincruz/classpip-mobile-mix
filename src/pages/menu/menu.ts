import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { UtilsService } from '../../providers/utils.service';
import { LoginService } from '../../providers/login.service';
import { SchoolService } from '../../providers/school.service';
import { GetQuestionnaireService } from '../../providers/getQuestionnaire.service';
import { RoleSelectPage } from '../../pages/role-select/role-select';
import { HomePage } from '../../pages/home/home';
import { SchoolPage } from '../../pages/school/school';
import { ProfilePage } from '../../pages/profile/profile';
import { Page } from '../../model/page';
import { School } from '../../model/school';
import { GetQuestionnairePage } from '../../pages/getQuestionnaire/getQuestionnaire';
import { LoginPage } from '../../pages/login/login';
import {Group} from "../../model/group";
import {GroupService} from "../../providers/group.service";
import {CollectionSpage} from "../collection/collection-student/collection-student";
import {CollectionTpage} from "../collection/collection-teacher/collection-teacher";
import {Role} from "../../model/role";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  public rootPage: Component;
  public homePage: Page;
  public schoolPage: Page;
  public loginPage: Page = new Page(LoginPage);

  constructor(
    public navController: NavController,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    private loginService: LoginService,
    public groupServices: GroupService){

    this.rootPage = HomePage;
    this.homePage = new Page(HomePage, this.translateService.instant('HOME.TITLE'));
    this.schoolPage = new Page(SchoolPage, this.translateService.instant('SCHOOL.TITLE'));
  }

  /**
   * Method for opening a page
   * @param {Page} page Page to open
   */
  public openPage(page: Page): void {
    this.nav.setRoot(page.component);
  }

  /**
   * Method for calling the logout service
   */
  public logout(): void {
    this.loginService.logout().subscribe(
      success => this.nav.setRoot(RoleSelectPage),
      error => location.reload());
  }

  /**
   * Method for displaying the profile page
   */
  public showProfile(): void {
    this.navController.push(ProfilePage);
  }

  /**
   * Method called from the home page to open the details of the
   * school of the current user
   * @param {School} school to open
   */
  public goToSchool(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.schoolService.getMySchool().subscribe(
      ((value: School) => this.navController.push(SchoolPage, { school: value })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        this.ionicService.removeLoading();
      });
  }

  /**
   * Method for displaying the GetQuestionnairePage page
   */
  public goToGetQuestionnaire(): void {

    this.groupServices.getGroups2().subscribe(
      ((value: Array<Group>) => this.navController.push(GetQuestionnairePage, { groups: value})),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));


    //this.navController.push(GetQuestionnairePage);
  }

  /**
   * Method for displaying the collection page
   */
  public showCollection(): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));
    //var regexp = /teachers/gi;
    //if(this.utilsService.getMyUrl().search(regexp) >= 0) {
    if(this.utilsService.role === Role.TEACHER) {
      this.navController.push(CollectionTpage).catch(error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    } else {
      this.navController.push(CollectionSpage).catch(error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });

    }

    this.ionicService.removeLoading();
  }
}
