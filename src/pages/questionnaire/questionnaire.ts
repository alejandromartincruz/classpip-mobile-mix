import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Credentials } from '../../model/credentials';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Group } from '../../model/group';
import { Question } from '../../model/question';
import { Answer } from '../../model/answer';
import { Student } from '../../model/student';
import { CorrectAnswer } from '../../model/correctAnswer';
import { Questionnaire } from '../../model/questionnaire';
import { StudentPage } from '../students/student/student';
import { Questionnaire1Page } from '../../pages/questionnaire1/questionnaire1';
import { GetQuestionnairePage } from '../../pages/getQuestionnaire/getQuestionnaire';
import { ResultQuestionnairePage } from '../../pages/resultQuestionnaire/resultQuestionnaire';
import { CompletedQuestionnairePage } from '../../pages/completedQuestionnaire/completedQuestionnaire';
import { ResultQuestionnaire } from '../../model/resultQuestionnaire';
import { Role } from '../../model/role';
import { UtilsService } from '../../providers/utils.service';

import {
  FormGroup,
  FormControl
} from '@angular/forms';

export interface PTimer {
  time: number;
  timeRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'page-questionnaire',
  templateUrl: './questionnaire.html'
})
export class QuestionnairePage {

  public myQuestionnaire: Questionnaire;
  public questions: Array<Question>;
  public questionsAnswers: Array<Question>
  public myCredentials: Credentials;
  public indexNum: number;
  public numTotalQuestions: number;
  public numQuestions: number;
  public numAnswerCorrect: number;
  public numAnswerNoCorrect: number;
  public finalNote: number = 0;
  public questionsSend: Question;
  public resultQuestionnaire: ResultQuestionnaire;
  public dataAnswers  = [];

  questionForm;

  public timeInSeconds: number;
  public timer: PTimer;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {

    this.questionForm = new FormGroup({
      "questionsSend": new FormControl({value: this.questionsSend, disabled: false})
    });

    this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    this.questions = this.navParams.data.questions;

    this.indexNum = this.navParams.data.indexNum;
    this.numTotalQuestions = this.questions.length;
    this.questionsSend = this.questions[this.indexNum];

    this.numAnswerCorrect = this.navParams.data.numAnswerCorrect;
    this.numAnswerNoCorrect = this.navParams.data.numAnswerNoCorrect;
    this.dataAnswers = this.navParams.data.dataAnswers;
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
   * This method returns the questions list of the
   * current questionnaire
   * @param {Refresher} Refresher element
   */
  private getQuestions(refresher?: Refresher): void {

    this.questionnaireService.getMyQuestionnaireQuestions(this.myCredentials).finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Question>) => this.questions = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }


 /**
   * This method manages the call to the service for performing a doSubmitAnswer
   * against the public services
   */
  public doSubmitAnswer(event) {

    //this.ionicService.showLoading(JSON.stringify(this.questionForm.value.questionsSend));
    this.timer.hasStarted = false;
    this.timer.runTimer = false;

    this.dataAnswers.push(this.questionForm.value.questionsSend);

    //dataAnswers = JSON.stringify(this.questionForm.value.questionsSend).split('"');
    this.indexNum += 1;

    if((this.indexNum) < this.numTotalQuestions){
        this.navController.setRoot(Questionnaire1Page, { myQuestionnaire: this.myQuestionnaire, myCredentials: this.myCredentials, questions: this.questions, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
    }else{
      //this.finalNote = this.numAnswerCorrect - this.numAnswerNoCorrect;

    this.questionnaireService.getMyStudent(this.utilsService.currentUser.userId).subscribe(
      ((value: Student) => this.navController.setRoot(CompletedQuestionnairePage, { student: value, myQuestionnaire: this.myQuestionnaire, numTotalQuestions: this.numTotalQuestions, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, finalNote: this.finalNote, dataAnswers: this.dataAnswers, myQuestions: this.questions, myCredentials: this.myCredentials })),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      }

      event.preventDefault();
    }


  /**
   * This method manages the call to the service for performing a doSubmitEmptyAnswer
   */
    public doSubmitEmptyAnswer() {

    this.dataAnswers.push('empty');
    this.indexNum += 1;

    if((this.indexNum) < this.numTotalQuestions){
        this.navController.setRoot(Questionnaire1Page, { myQuestionnaire: this.myQuestionnaire, myCredentials: this.myCredentials, questions: this.questions, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
    }else{
      //this.finalNote = this.numAnswerCorrect - this.numAnswerNoCorrect;

    this.questionnaireService.getMyStudent(this.utilsService.currentUser.userId).subscribe(
      ((value: Student) => this.navController.setRoot(CompletedQuestionnairePage, { student: value, myQuestionnaire: this.myQuestionnaire, numTotalQuestions: this.numTotalQuestions, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, finalNote: this.finalNote, dataAnswers: this.dataAnswers, myQuestions: this.questions, myCredentials: this.myCredentials })),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      }
    }

  /**
   *  TIMER START
   */
  ngOnInit() {
    this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }
  resumeTimer() {
    this.startTimer();
  }

  initTimer() {
    if (!this.timeInSeconds){
      this.timeInSeconds = this.questionsSend.time;
    }

    this.timer = <PTimer>{
      time: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      timeRemaining: this.timeInSeconds
    };
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
    this.startTimer();
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.timer.runTimer){
        return;
      }
      this.timer.timeRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
      if (this.timer.timeRemaining > 0) {
        this.timerTick();
      }
      else {
        this.timer.hasFinished = true;
        if (this.timer.timeRemaining === 0) {
          this.doSubmitEmptyAnswer();
        }
      }
    }, 1000);
  }

  //this.ionicService.showLoading(this.timer.timeInSeconds.toLocaleString());

  /**
   *  TIMER STOP
  */

}


