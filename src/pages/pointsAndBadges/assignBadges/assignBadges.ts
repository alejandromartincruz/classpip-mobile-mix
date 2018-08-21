import {SchoolService} from "../../../providers/school.service";
import {IonicService} from "../../../providers/ionic.service";
import {BadgeRelationService} from "../../../providers/badgeRelation.service";
import {NavController, NavParams, Refresher, ToastController} from "ionic-angular";
import {UtilsService} from "../../../providers/utils.service";
import {BadgeService} from "../../../providers/badge.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Role} from "../../../model/role";
import {Component} from "@angular/core";
import {Group} from "../../../model/group";
import {GroupService} from "../../../providers/group.service";
import {Student} from "../../../model/student";
import {StudentsSelected} from "../../../model/studentsSelected";
import {Badge} from "../../../model/badge";
import {CollectionTpage} from "../../collection/collection-teacher/collection-teacher";
import {MenuPage} from "../../menu/menu";
import {PointsAndBadgesPage} from "../pointsAndBadges";

@Component({
  selector: 'page-assignBadges',
  templateUrl: './assignBadges.html'
})
export class AssignBadgesPage{
  groupsArraySelected: Array<Group> = new Array<Group>() ;
  studentsArraySelected: Array<Student> = new Array<Student>();
 // badgeArraySelected: Array<Badge> = new Array<Badge>();

  public myRole: Role;
  public role = Role;

  public groupsArray: Array<Group> = new Array<Group>();
  public studentsArray: Array<Student> = new Array<Student>();
  public studentsSelectedArray: Array<StudentsSelected> = new Array<StudentsSelected>();
  public badgeArray: Array<Badge> = new Array<Badge>();

  public showStudents: Boolean = false;

  public groupSelected: string;
  public valueRel: number = 1;
  public badgeSelected: string;
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
    public toastCtrl: ToastController) {

    this.myRole = this.utilsService.role;
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

  /**
   * Resets all the fields
   */
  public newRelation(): void {
    this.groupsArraySelected = new Array<Group>();
    this.studentsArray = new Array<Student>();
    this.badgeArray = new Array<Badge>();
    this.groupSelected = "";
    this.instruction = true;
  }

  /**
   * Method that gets all the grups of the teacher and all the badges to assign
   */
  public getInfo(): void {
    this.groupService.getMyGroups().subscribe(
      ((value: Array<Group>) => this.groupsArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.schoolService.getMySchoolBadges().subscribe(
      ((value: Array<Badge>) => this.badgeArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Gets the students of the group selected
   */
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

  /**
   * Method that fires when the screen refreshes
   */
  public refresh(groupsSelected: string, badge: string, refresher: Refresher){
    if(groupsSelected != ""){
      this.instruction = false;
      this.showselected(groupsSelected, refresher);
    }
    if(badge != ""){
      this.getSelectedBadge(badge);
    }
    refresher ? refresher.complete() : null;
    this.ionicService.removeLoading();
  }

  public getSelectedBadge(badge: string): void {
    this.badgeSelected = badge;
  }

  public getSelectedStudents(stuArray: Array<StudentsSelected>){
    this.studentsSelectedArray = stuArray;
  }

  public postBadgesToStudents(): void {
    let corr: Boolean = false;
    if(+this.badgeSelected>= 1){
      if (this.valueRel >= 1) {
        if (this.studentsSelectedArray.length > 0) {
          for (let st of this.studentsSelectedArray) {
            if (st.selected) {
              corr = true;
              this.badgeRelationService.postBadgeRelation(this.badgeSelected, st.student.id, st.student.schoolId.toString(), this.groupSelected, this.valueRel).subscribe(
                response => {
                },
                error => {
                  this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
                  corr = false;
                });
            }
          }
          if (corr) {
            this.ionicService.showAlert("", this.translateService.instant('BADGES.CORASSIGN'));
            this.navController.setRoot(MenuPage).then(() => {
              this.navController.push(PointsAndBadgesPage);
            });
          } else {
            this.ionicService.showAlert("", this.translateService.instant('VALIDATION.STUDENTSELECTED'));
          }
        } else {
          this.ionicService.showAlert("", this.translateService.instant('VALIDATION.STUDENTSELECTED'));
        }
      } else {
        this.ionicService.showAlert("", this.translateService.instant('VALIDATION.QTY'));
      }
    } else {
        this.ionicService.showAlert("", this.translateService.instant('VALIDATION.BADGE'));
    }
  }

}
