import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Credentials } from '../../model/credentials';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Group } from '../../model/group';
import { Question } from '../../model/question';
import { Point } from '../../model/point';
import { Student } from '../../model/student';
import { Answer } from '../../model/answer';
import { CorrectAnswer } from '../../model/correctAnswer';
import { Questionnaire } from '../../model/questionnaire';
import { ResultQuestionnaire } from '../../model/resultQuestionnaire';
import { StudentPage } from '../students/student/student';
import { Questionnaire1Page } from '../../pages/questionnaire1/questionnaire1';
import { MenuPage } from '../../pages/menu/menu';
import { PointService} from '../../providers/point.service';
import { GroupService} from '../../providers/group.service';
import { PointRelationService } from '../../providers/pointRelation.service';
import { PointRelation } from '../../model/pointRelation';
import {BadgeRelationService} from "../../providers/badgeRelation.service";
import {BadgeService} from "../../providers/badge.service";
import {Badge} from "../../model/badge";
import {BadgeBadgeRelation} from "../../model/badgeBadgeRelation";

@Component({
  selector: 'page-resultQuestionnaire',
  templateUrl: './resultQuestionnaire.html'
})

export class ResultQuestionnairePage {

  public myResults: ResultQuestionnaire;
  public student: Student;
  public myGroups: Array<Group>;
  public group: Group;
  public result: ResultQuestionnaire;
  public myQuestions: Array<Question>;
  public points: Point;
  public pointRelation: PointRelation;
  public myQuestionnaire: Questionnaire;
  public myQuestionsCorrectAnswers: Array<Question>;
  public myCredentials: Credentials;
  public myAnswers: Array<string>;
  public dataAnswers: Array<string>;

  public numTotalQuestions: number = 0;
  public numAnswerCorrect: number = 0;
  public numAnswerNoCorrect: number = 0;
  public finalNote: number = 0;
  public mark: number = 0;
  public num: number = 100006;
  public pointsWon: number;
  public badgeWon: string;
  public hayPuntos: Boolean;
  public hayBadges: Boolean;
  public badgeItem: Badge = new Badge();
  public pointItem: Point = new Point();


  constructor(
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public groupService: GroupService,
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService,
    public badgeService: BadgeService,
    public badgeRelationService: BadgeRelationService) {

    this.myQuestionsCorrectAnswers = this.navParams.data.myQuestionsCorrectAnswers;
    //this.myResults = this.navParams.data.myResults;

    this.student = this.navParams.data.student;
    this.myQuestions = this.navParams.data.myQuestions;
    this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    this.myCredentials = this.navParams.data.myCredentials;
    this.numTotalQuestions = this.navParams.data.numTotalQuestions;
    this.numAnswerCorrect = this.navParams.data.numAnswerCorrect;
    this.numAnswerNoCorrect = this.navParams.data.numAnswerNoCorrect;
    this.finalNote = this.navParams.data.finalNote;
    this.dataAnswers = this.navParams.data.dataAnswers;

    //this.dataAnswers;
    //this.myAnswers = this.navParams.data.dataAnswers.split(",");
    this.getCorrectionQuestionnaire();


  }
  public pointsSend(text: string) {

    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.ionicService.removeLoading();
  }

  /**
   * Method for displaying the MenuPage page
   */
  public outQuestionnaire(event) {
    this.navController.setRoot(MenuPage);
  }

  /**
  * Method to correct the results of the questionnaire
  */
  public getCorrectionQuestionnaire(): void {

    for (var i = 0; i < this.numTotalQuestions; i++) {
      if (this.dataAnswers[i] === this.myQuestionsCorrectAnswers[i].correctAnswer[0].name) {
        this.numAnswerCorrect += 1;
      }
      else {
        this.numAnswerNoCorrect += 1;
      }
    }

    this.mark = this.numAnswerCorrect * 10 / this.numTotalQuestions;
    switch (Math.floor(this.mark)) {
      case 10:
        this.pointsWon = this.myQuestionnaire.points[0];
        break;
      case 9:
        this.pointsWon = this.myQuestionnaire.points[1];
        break;
      case 8:
        this.pointsWon = this.myQuestionnaire.points[2];
        break;
      case 7:
        this.pointsWon = this.myQuestionnaire.points[3];
        break;
      case 6:
        this.pointsWon = this.myQuestionnaire.points[4];
        break;
      case 5:
        this.pointsWon = this.myQuestionnaire.points[5];
        break;
      default:
        this.pointsWon = this.myQuestionnaire.points[6];
        break;
    }

    this.finalNote = this.numAnswerCorrect - this.numAnswerNoCorrect;

    this.questionnaireService.saveResults(this.student, this.myQuestionnaire, this.myQuestionnaire.name, this.myQuestionnaire.id, this.numTotalQuestions, this.numAnswerCorrect, this.numAnswerNoCorrect, this.finalNote, this.dataAnswers).subscribe(
      ((value: ResultQuestionnaire) => this.result = value),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.pointService.getPoint(this.num).subscribe(
      ((value: Point) => this.points = value),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.groupService.getMyGroups().subscribe(
      ((value: Array<Group>) => this.myGroups = value),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    this.hayPuntos = false;
    for (let q of this.myQuestionnaire.points) {
      if (q != 0) {
        this.hayPuntos = true;
      }
    }
    if (this.hayPuntos && this.pointsWon != 0) {
      this.pointService.getPoint(this.num).subscribe(
        ((value2: Point) => {
          this.pointItem = value2;
        }),
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
      this.pointRelationService.postPointRelation(this.num.toString(), this.student.id, this.student.schoolId.toString(),this.myQuestionnaire.groupid, this.pointsWon).subscribe(
        response => {
        },
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }
    let x = this.mark;
    switch (true) {
      case (x > 9):
        this.badgeWon = this.myQuestionnaire.badges[0];
        break;
      case (x > 7):
        this.badgeWon = this.myQuestionnaire.badges[1];
        break;
      case (x > 5):
        this.badgeWon = this.myQuestionnaire.badges[2];
        break;
      default:
        this.badgeWon = "null";
        break;
    }
    if(typeof this.myQuestionnaire.badges != 'undefined' && this.badgeWon != "null"){
      this.hayBadges = true;
      this.badgeService.getBadge(+this.badgeWon).subscribe(
        ((value2: Badge) => {
          this.badgeItem = value2;
        }),
          error => {
            this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });

      this.badgeRelationService.postBadgeRelation(this.badgeWon, this.student.id, this.student.schoolId.toString(), this.myQuestionnaire.groupid, 1).subscribe(
        response => {

        },
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }


     /* for(var i = 0; i < this.myGroups.length; i++)
      {
          for(var n = 0; n < this.myGroups[i].students.length; n++)
        {
          if(this.myGroups[i].students[n].id == this.student.id)
          {
            this.group = this.myGroups[i];
          }
        }


      }*/
  }

}
