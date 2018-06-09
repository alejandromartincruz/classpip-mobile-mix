import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Credentials } from '../../model/credentials';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Group } from '../../model/group';
import { Question } from '../../model/question';
import { Student } from '../../model/student';
import { Answer } from '../../model/answer';
import { CorrectAnswer } from '../../model/correctAnswer';
import { Questionnaire } from '../../model/questionnaire';
import { ResultQuestionnaire } from '../../model/resultQuestionnaire';
import { StudentPage } from '../students/student/student';
import { Questionnaire1Page } from '../../pages/questionnaire1/questionnaire1';
import { ResultQuestionnairePage } from '../../pages/resultQuestionnaire/resultQuestionnaire';
import { MenuPage } from '../../pages/menu/menu';


@Component({
  selector: 'page-completedQuestionnaire',
  templateUrl: './completedQuestionnaire.html'
})

export class CompletedQuestionnairePage {

  public student: Student;
  public numTotalQuestions: number;
  public numAnswerCorrect: number;
  public numAnswerNoCorrect: number;
  public finalNote: number;
  public myQuestions: Array<Question>;
  //public dataAnswers: Array<string>;
  public dataAnswers  = [];
  public myQuestionnaire: Questionnaire;
  public myCredentials: Credentials;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {

    //this.myResults = this.navParams.data.results;
    this.student = this.navParams.data.student;
    this.numTotalQuestions = this.navParams.data.numTotalQuestions;
    this.numAnswerCorrect = this.navParams.data.numAnswerCorrect;
    this.numAnswerNoCorrect = this.navParams.data.numAnswerNoCorrect;
    this.finalNote = this.navParams.data.finalNote;
    this.dataAnswers = this.navParams.data.dataAnswers;
    this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    this.myQuestions = this.navParams.data.myQuestions;
    this.myCredentials = this.navParams.data.myCredentials;

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
  /*public outQuestionnaire(event) {
    this.navController.setRoot(MenuPage);
  }*/

  /**
   * This method returns the questions list of the
   * current questionnaire
   * @param Array<Question>
   */
  public getResults(event) {

    this.questionnaireService.getQuestionsAnswersCorrectAnswers(this.myCredentials).subscribe(
      ((value: Array<Question>) => this.navController.setRoot(ResultQuestionnairePage, { myQuestionsCorrectAnswers: value, student: this.student, myQuestionnaire: this.myQuestionnaire, numTotalQuestions: this.numTotalQuestions, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, finalNote: this.finalNote, dataAnswers: this.dataAnswers, myQuestions: this.myQuestions, myCredentials: this.myCredentials })),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

}

