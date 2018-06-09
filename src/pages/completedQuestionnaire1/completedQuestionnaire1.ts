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
  selector: 'page-completedQuestionnaire1',
  templateUrl: './completedQuestionnaire1.html'
})

export class CompletedQuestionnaire1Page {

  public student: Student;
  public numTotalQuestions: number;
  public numAnswerCorrect: number;
  public numAnswerNoCorrect: number;
  public finalNote: number;
  public myQuestions: Array<Question>;
  public dataAnswers  = [];
  public myQuestionnaire: Questionnaire;
  public myCredentials: Credentials;
  public result: ResultQuestionnaire;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {

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
  public outQuestionnaire(event) {

    this.finalNote = this.numAnswerCorrect - this.numAnswerNoCorrect;

      this.questionnaireService.saveResults(this.student, this.myQuestionnaire, this.myQuestionnaire.name, this.myQuestionnaire.id, this.numTotalQuestions, this.numAnswerCorrect, this.numAnswerNoCorrect, this.finalNote, this.dataAnswers).subscribe(
      ((value: ResultQuestionnaire) => this.result = value),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));


    this.navController.setRoot(MenuPage);
  }

}

