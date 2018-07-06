import {Component} from "@angular/core";
import {CollectionService} from "../../../../providers/collection.service";
import {MatterService} from "../../../../providers/matter.service";
import {
  ActionSheetController, AlertController, MenuController, NavController, NavParams,
  Refresher
} from "ionic-angular";
import {UserService} from "../../../../providers/user.service";
import {GradeService} from "../../../../providers/grade.service";
import {IonicService} from "../../../../providers/ionic.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {UtilsService} from "../../../../providers/utils.service";
import {CollectionCard} from "../../../../model/collectionCard";
import {Card} from "../../../../model/card";
import {Group} from "../../../../model/group";
import {StudentsSelected} from "../../../../model/studentsSelected";
import {Student} from "../../../../model/student";
import {GroupService} from "../../../../providers/group.service";
import {CollectionTpage} from "../collection-teacher";
import {MenuPage} from "../../../menu/menu";

@Component({
  selector: 'page-assignCardsMultipleStudent',
  templateUrl: './assignCardsMultipleStudent.html'
})
export class AssignCardsMultipleStudent{

  public cards: Array<Card>;
  public collectionCard: CollectionCard;
  public groups: Array<Group>;
  public instruction:Boolean = true;
  public studentsSelectedArray: Array<StudentsSelected> = new Array<StudentsSelected>();
  public groupSelected: string;
  public studentsArray: Array<Student> = new Array<Student>();
  public numCartas: number;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public userService: UserService,
    public ionicService: IonicService,
    public navController: NavController,
    public menuController: MenuController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public groupService: GroupService) {

    this.cards = this.navParams.data.cards;
    this.collectionCard = this.navParams.data.collectionCard;
    this.groups = this.navParams.data.groups;
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
    //this.showStudents = true;

  }
  public refresh(groupsSelected: string, refresher: Refresher){
    if(groupsSelected != "" || typeof groupsSelected == 'undefined'){
      this.instruction = false;
      this.showselected(groupsSelected, refresher);
    }
    refresher ? refresher.complete() : null;
    this.ionicService.removeLoading();
  }

  public postCardsToStudents(){
    if(this.studentsSelectedArray.length != 0) {
      if(+this.numCartas >= 1) {
        this.goToAssignRandomCard(this.numCartas, this.cards);
        this.utilsService.presentToast('Cards assigned successfully');
        this.navController.setRoot(MenuPage).then(() => {
          this.navController.push(CollectionTpage);
        });
      } else {
        this.ionicService.showAlert("", this.translateService.instant('VALIDATION.QTY'));
      }
    } else {
      this.ionicService.showAlert("", this.translateService.instant('VALIDATION.STUDENTSELECTED'));
    }

  }
  public getSelectedStudents(stuArray: Array<StudentsSelected>){
    this.studentsSelectedArray = stuArray;
  }


  public goToAssignRandomCard(num: number, cards: Array<Card>) {
    let randomCards = Array<Card>();
    let altoArray = Array<Card>();
    let medioArray = Array<Card>();
    let bajoArray = Array<Card>();
    let raroArray = Array<Card>();
    cards.forEach(card => {
      if (card.ratio === "alto"){
        altoArray.push(card);
      }
      if (card.ratio === "medio"){
        medioArray.push(card);
      }
      if (card.ratio === "bajo"){
        bajoArray.push(card);
      }
      if (card.ratio === "raro"){
        raroArray.push(card);
      }
    });
    for (let i = 0; i<num; i++){
      let randomNumber = this.randomNumber(1,100);
      if ((randomNumber > 65)&&(altoArray.length!=0)){
        let cardPosition = this.randomNumber(0,altoArray.length -1);
        randomCards.push(altoArray[cardPosition]);
      }
      else if ((randomNumber > 35)&&(medioArray.length!=0)){
        let cardPosition = this.randomNumber(0,medioArray.length -1);
        randomCards.push(medioArray[cardPosition]);

      }
      else if ((randomNumber > 10)&&(bajoArray.length!=0)){
        let cardPosition = this.randomNumber(0,bajoArray.length -1);
        randomCards.push(bajoArray[cardPosition]);
      }
      else if ((randomNumber > 0)&&(raroArray.length!=0)){
        let cardPosition = this.randomNumber(0,raroArray.length -1);
        randomCards.push(raroArray[cardPosition]);
      }
    }
    this.goToAssignCard(randomCards);
  };

  public goToAssignCard(cards){

    for (let i=0 ; i<cards.length ; i++){
      for(let stu of this.studentsSelectedArray) {
        this.collectionService.assignCardToStudent(stu.student.id, cards[i].id).subscribe(response => {
          },
          error => {
            this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
          });
      }
    }
    /*this.navController.setRoot(MenuPage).then(()=>{
      this.navController.push(CollectionTpage);
    });*/

  }

  public randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
