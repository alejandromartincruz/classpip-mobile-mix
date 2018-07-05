import {NavController, NavParams} from "ionic-angular";
import {Credentials} from "../../../model/credentials";
import {Component} from "@angular/core";
import {Question} from "../../../model/question";
import {IonicService} from "../../../providers/ionic.service";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Student} from "../../../model/student";
import {Questionnaire} from "../../../model/questionnaire";
import {ResultQuestionnaire} from "../../../model/resultQuestionnaire";
import {QuestionnaireService} from "../../../providers/questionnaire.service";
import {PointService} from "../../../providers/point.service";
import {Point} from "../../../model/point";
import {BadgeService} from "../../../providers/badge.service";
import {Badge} from "../../../model/badge";
import {CollectionService} from "../../../providers/collection.service";
import {CollectionCard} from "../../../model/collectionCard";
import {MenuPage} from "../../menu/menu";

@Component({
  selector: 'page-resultQuestionnaireOpen',
  templateUrl: './resultQuestionnaireOpen.html'
})

export class ResultQuestionnaireOpenPage {

  public student: Student;
  public myQuestions: Array<Question>;
  public dataAnswers = [];
  public myQuestionnaire: Questionnaire = new Questionnaire();
  public myCredentials: Credentials;
  public result: ResultQuestionnaire;

  public pointId: number = 100006;
  public point: Point = new Point();

  public badge0:Badge = new Badge();
  public badge1:Badge = new Badge();
  public badge2:Badge = new Badge();

  public collection: CollectionCard = new CollectionCard();

  constructor(public navParams: NavParams,
              public navController: NavController,
              public ionicService: IonicService,
              public questionnaireService: QuestionnaireService,
              public translateService: TranslateService,
              public pointService: PointService,
              public badgeService: BadgeService,
              public collectionService: CollectionService) {

    this.student = this.navParams.data.student;
    //this.numTotalQuestions = this.navParams.data.numTotalQuestions;
    //this.numAnswerCorrect = this.navParams.data.numAnswerCorrect;
    //this.numAnswerNoCorrect = this.navParams.data.numAnswerNoCorrect;
    //this.finalNote = this.navParams.data.finalNote;
    //this.dataAnswers = this.navParams.data.dataAnswers;
    this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    //this.myQuestions = this.navParams.data.myQuestions;
    //this.myCredentials = this.navParams.data.myCredentials;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.ionicService.removeLoading();
    //this.ionicService.showAlert("", this.myQuestionnaire.points[2].toString());
    if(this.hayPuntos()){
      this.getPoints();
    }
    if(this.hayBadges()){
      this.getBadge();
    }
    if(this.hayCollections()){
      this.getCollection();
    }
  }

  public hayPuntos(): Boolean {
    let cont = 0;
    for (let q of this.myQuestionnaire.points) {
      cont++;
      if (q != 0 && cont < this.myQuestionnaire.points.length-1) {
        return true;
      }
    }
    return false;
  }

  public getPoints(): void {
    this.pointService.getPoint(this.pointId).subscribe(
      ((value: Point) => {
        this.point = value;
      }),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public hayBadges(): Boolean{
    return typeof this.myQuestionnaire.badges != 'undefined';// && this.badgeWon != "null"
  }

  public getBadge(): void {
    this.badgeService.getBadge(+this.myQuestionnaire.badges[0]).subscribe(
      ((value: Badge) => {
        this.badge0 = value
      }),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.badgeService.getBadge(+this.myQuestionnaire.badges[1]).subscribe(
      ((value: Badge) => {
        this.badge1 = value
      }),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.badgeService.getBadge(+this.myQuestionnaire.badges[2]).subscribe(
      ((value: Badge) => {
        this.badge2 = value
      }),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public hayCollections(): Boolean{
    return typeof this.myQuestionnaire.packCards != 'undefined';
  }

  public getCollection(): void {
    this.collectionService.getCollectionById(this.myQuestionnaire.packCards[0].toString()).subscribe(
      ((value: CollectionCard) => {
          this.collection = value;
      }
    ),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
  public outQuestionnaire(event) {

    this.navController.setRoot(MenuPage);
  }

}
