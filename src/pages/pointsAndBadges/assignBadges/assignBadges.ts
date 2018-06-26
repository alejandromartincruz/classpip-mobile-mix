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

@Component({
  selector: 'page-assignBadges',
  templateUrl: './assignBadges.html'
})
export class AssignBadgesPage{
  groupsArraySelected: Array<Group> = new Array<Group>() ;
  studentsArraySelected: Array<Student> = new Array<Student>();
  badgeArraySelected: Array<Badge> = new Array<Badge>();

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

    //this.badges = this.navParams.data.badges;
    //this.points = this.navParams.data.point;
    this.myRole = this.utilsService.role;
    //this.groupsArray = this.navParams.data.groupsArray;
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
    this.badgeArraySelected = new Array<Badge>();
    this.studentsArray = new Array<Student>();
    this.badgeArray = new Array<Badge>();
    this.groupSelected = "";
    this.badgeSelected = "";
    this.instruction = true;
  }

  public getInfo(): void {
    this.groupService.getMyGroups().subscribe(
      ((value: Array<Group>) => this.groupsArray = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.schoolService.getMySchoolBadges().subscribe(
      ((value: Array<Badge>) => this.badgeArray = value),
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
    let corr: Boolean = true;
    for(let st of this.studentsSelectedArray) {
      if(st.selected) {
        this.badgeRelationService.postBadgeRelation(this.badgeSelected, st.student.id, st.student.schoolId.toString(), this.groupSelected, this.valueRel).subscribe(
          response => {

          },
          error => {
            this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
            corr = false;
          });
      }
    }
    if(corr){
      this.newRelation();
      this.ionicService.showAlert("",this.translateService.instant('BADGES.CORASSIGN'));
    }
  }

}
