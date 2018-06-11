import { Component } from '@angular/core';
import { NavController, MenuController,ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { LoginService } from '../../providers/login.service';
import { UtilsService } from '../../providers/utils.service';
import { QuestionnairePage } from '../../pages/questionnaire/questionnaire';
import { QuestionnaireTextAreaPage } from '../../pages/questionnaireTextArea/questionnaireTextArea';
import { QuestionnaireImagePage } from '../../pages/questionnaireImage/questionnaireImage';
import { MenuPage } from '../../pages/menu/menu';
import { Page } from '../../model/page';
import { Role } from '../../model/role';
import { Credentials } from '../../model/credentials';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Questionnaire } from '../../model/questionnaire';
import { Question } from '../../model/question';
import { Answer } from '../../model/answer';
//import { TimerComponent } from '../../components/timer/timer';

@Component({
  selector: 'page-getQuestionnaire',
  templateUrl: './getQuestionnaire.html'
})
export class GetQuestionnairePage {

  public credentials: Credentials = new Credentials();
  public questions: Array<Question>;
  public answers: Array<Answer>;
  public myQuestionnaire: Questionnaire;
  public numAnswerCorrect: number = 0;
  public numAnswerNoCorrect: number = 0;
  public indexNum: number = 0;
  public dataAnswers  = [];

  constructor(
    public navController: NavController,
    public questionnaireService: QuestionnaireService,
    public ionicService: IonicService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public toastCtrl: ToastController,

    //private timer: TimerComponent,
    public menuController: MenuController) {

    // TODO: remove this
    switch (utilsService.role) {
      case Role.STUDENT:
        this.credentials.username = 'student-1';
        this.credentials.id = this.credentials.id;
        break;
      case Role.TEACHER:
        this.credentials.username = 'teacher-1';
        this.credentials.id = this.credentials.id;
        break;
      case Role.SCHOOLADMIN:
        this.credentials.username = 'school-admin-1';
        this.credentials.id = this.credentials.id;
        break;
      default:
        break;
    }

  }

    /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.menuController.enable(true);
  }
  public pointsSend(text: string) {

    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  /**
   * This method manages the call to the service for performing a getQuestionnaire
   * against the public services
   */
  public getQuestionnaire(): void {

    this.questionnaireService.getMyQuestionnaire(this.credentials).subscribe(
      ((value: Questionnaire) =>{ this.myQuestionnaire = value

        this.pointsSend(this.myQuestionnaire.groupid);

      }),
    error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));


    this.questionnaireService.getMyQuestionnaireQuestions(this.credentials).subscribe(
      ((value: Array<Question>) => {


        switch (value[0].type) {
          case 'test':
            this.navController.setRoot(QuestionnairePage, { questions: value, myCredentials: this.credentials, myQuestionnaire: this.myQuestionnaire, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
            //this.timer.setTimeQuestion(30);
            break;
          case 'textArea':
            this.navController.setRoot(QuestionnaireTextAreaPage, { questions: value, myCredentials: this.credentials, myQuestionnaire: this.myQuestionnaire, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
            break;
          case 'image':
            this.navController.setRoot(QuestionnaireImagePage, { questions: value, myCredentials: this.credentials, myQuestionnaire: this.myQuestionnaire, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
            break;
          default:
            break;
        }
      }),
    error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

  }
}
