import { Component } from '@angular/core';
import {NavController, MenuController, ToastController, NavParams} from 'ionic-angular';
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
import {Group} from "../../model/group";
import {ResultQuestionnaire} from "../../model/resultQuestionnaire";
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
  public groups: Array<Group>;
  public found: Boolean;
  public enableGetQuest: Boolean = false;

  listQuest:string;

  public questionnairesArrayDone: Array<Questionnaire> = new Array<Questionnaire>();
  public questionnairesArrayNOTDone: Array<Questionnaire> = new Array<Questionnaire>();

  public result: ResultQuestionnaire = new ResultQuestionnaire();

  public myRole: Role;
  public role = Role;

  constructor(
    public navController: NavController,
    public questionnaireService: QuestionnaireService,
    public ionicService: IonicService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public navParms: NavParams,
    //private timer: TimerComponent,
    public menuController: MenuController) {

    // TODO: remove this
    switch (utilsService.role) {
      case Role.STUDENT:
        this.credentials.username = "student-1";
        this.credentials.id = this.credentials.id;
        this.getQuestionnairesStudents();
        break;
      case Role.TEACHER:
        this.credentials.id = this.credentials.id;
        this.getQuestionnaireTeacher();
        break;
      case Role.SCHOOLADMIN:
        this.credentials.username = 'school-admin-1';
        this.credentials.id = this.credentials.id;
        break;
      default:
        break;
    }
    this.myRole = this.utilsService.role;
    this.groups = this.navParms.data.groups;
  }

  public getQuestionnaireTeacher():void {
    this.questionnaireService.getTeacherQuestionnaires().subscribe(
      ((quest: Array<Questionnaire>) => {
        this.questionnairesArrayDone = quest;
      }),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public getQuestionnairesStudents(): void {
    /*this.questionnaireService.getResultQuestionnaires().subscribe(
      ((resultQuest: Array<ResultQuestionnaire>) => {
        for (let q of resultQuest) {
          this.pointsSend("ggg" + q.questionnaireName);
        }
      }),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
*/
    this.questionnaireService.getQuestionnaires().subscribe(
      ((quest: Array<Questionnaire>) => {
        /*this.questionnaireService.getResultQuestionnaires().subscribe(
          ((resultQuest: Array<ResultQuestionnaire>) => {*/
            for (let questi of quest) {
              for (let gro of this.groups) {
                if (questi.groupid == gro.id) {
                  this.questionnairesArrayDone.push(questi);
                  /*for(let res of resultQuest) {
                    this.result = res;
                    this.pointsSend( "ggg" + this.result);
                    this.pointsSend( "quest" + this.result.questionnaireId);
                  }*/

                }
              }
            }
          }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      /*}),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));*/
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

  private getEnableGetQuest(): void{
    this.enableGetQuest? this.enableGetQuest = false: this.enableGetQuest = true;
  }

  private changeActive(quest: Questionnaire): void{
    quest.active? quest.active = false: quest.active = true;
    //this.ionicService.showAlert("", "HOLA");
    this.questionnaireService.patchQuestionnaire(quest.id, quest.name, quest.date, quest.points, quest.badges, quest.groupid, quest.active ).subscribe(
      response => {
        //this.ionicService.showAlert("",response.active.toString());
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }

  /**
   * This method manages the call to the service for performing a getQuestionnaire
   * against the public services
   */
  public getQuestionnaire(): void {
    let active: Boolean = true;
    this.found = false;
    this.questionnaireService.getMyQuestionnaire(this.credentials).subscribe(
      ((value: Questionnaire) => {
        this.myQuestionnaire = value;
        if(this.myQuestionnaire.active == true) {
          for (let gro of this.groups) {
            if (gro.id == this.myQuestionnaire.groupid) {
              this.found = true;
            }
          }
        }
        else
        {
          active = false;
          this.ionicService.showAlert("", this.translateService.instant('QUESTIONNAIRE.CLOSED'))
        }
        if (this.found) {
          this.questionnaireService.getMyQuestionnaireQuestions(this.credentials).subscribe(
            ((value: Array<Question>) => {
              switch (value[0].type) {
                case 'test':
                  this.navController.setRoot(QuestionnairePage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  //this.timer.setTimeQuestion(30);
                  break;
                case 'textArea':
                  this.navController.setRoot(QuestionnaireTextAreaPage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  break;
                case 'image':
                  this.navController.setRoot(QuestionnaireImagePage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  break;
                default:
                  break;
              }
            }),
            error =>
              this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
          //this.pointsSend(this.myQuestionnaire.groupid);
        }
        else{
          if(active) {
            this.ionicService.showAlert("", this.translateService.instant('QUESTIONNAIRE.NOTACCESS'));
          }
        }

        }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

      //this.pointsSend("HOOOOLLLLAAA");

    }


}
