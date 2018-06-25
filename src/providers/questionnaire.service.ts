import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../providers/utils.service';
import { AppConfig } from '../app/app.config';
import { Credentials } from '../model/credentials';
import { Role } from '../model/role';
import { Login } from '../model/login';
import { Question } from '../model/question';
import { Questionnaire } from '../model/questionnaire';
import { Answer } from '../model/answer';
import { Student } from '../model/student';
import { CorrectAnswer } from '../model/correctAnswer';
import { IonicService } from '../providers/ionic.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GetQuestionnairePage } from '../pages/getQuestionnaire/getQuestionnaire';
import { ResultQuestionnaire } from '../model/resultQuestionnaire';
import {Point} from "../model/point";

@Injectable()
export class QuestionnaireService {

  constructor(
    public http: Http,
    public ionicService: IonicService,
    public translateService: TranslateService,
    public utilsService: UtilsService) {

    }

  /**
   * This method returns all questionnaires.
   * @return {Observable<Array<Questionnaire>>} returns an observable with the result
   * of the operation
   */
  public getQuestionnaires(): Observable<Array<Questionnaire>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIRE_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        return Questionnaire.toObjectArray(response.json())
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns all questionnaires.
   * @return {Observable<Array<Questionnaire>>} returns an observable with the result
   * of the operation
   */
  public getTeacherQuestionnaires(): Observable<Array<Questionnaire>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.TEACHER_URL + "/" +this.utilsService.currentUser.userId  + AppConfig.QUESTIONNAIRES_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        return Questionnaire.toObjectArray(response.json())
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns all questionnaires.
   * @return {Observable<Array<Questionnaire>>} returns an observable with the result
   * of the operation
   */
  public getResultQuestionnaires(): Observable<Array<ResultQuestionnaire>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.RESULTQUESTIONNAIRE_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) =>
        Questionnaire.toObjectArray(response.json())
      )
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
   * This method returns the current questionnaire of the logged
   * in user.
   * @return {Observable<Questionnaire>} returns an observable with the result
   * of the operation
   */
  public getMyQuestionnaire(credentials: Credentials): Observable<Questionnaire> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIRE_URL + '/' + credentials.id;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        let questionnaire: Questionnaire = Questionnaire.toObject(response.json())
        this.utilsService.currentQuestionnaire = questionnaire;
        return questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * Returns the list of questions by a questionnaire id.
   * @return Observable{Array<Question>} returns the list of questions
   * that include the four possible answers and the correct answer
   */
  public getMyQuestionnaireQuestions(credentials: Credentials): Observable<Array<Question>> {

    var ret: Array<Question> = new Array<Question>();

    return Observable.create(observer => {
      this.getQuestionnaireQuestions(credentials).subscribe(
        questions => {
          questions.forEach(question => {
            this.getQuestionAnswers(question.id).subscribe(
              answers => {
                question.answer = answers;
                 // this.getQuestionCorrectAnswers(question.id).subscribe(
                   // correctAnswer => {
                     // question.correctAnswer = correctAnswer;
                      ret.push(question);
                      if (ret.length === questions.length) {
                        observer.next(ret);
                        observer.complete();
                      }
                   // }, error => observer.error(error))
              }, error => observer.error(error))
          });
        }, error => observer.error(error)
      )
    });
  }

  /**
   * Returns the list of questions by a questionnaire id.
   * @return Observable{Array<Question>} returns the list of questions
   */
  private getQuestionnaireQuestions(credentials: Credentials): Observable<Array<Question>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var count: number = 0;
    var url: string = AppConfig.QUESTIONNAIRE_URL + '/' + credentials.id + AppConfig.QUESTIONS_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) =>  Question.toObjectArray(response.json()))
  }

  /**
   * Returns the list of answers by a questionnaire id.
   * @return Observable{Array<Answer>} returns the list of answers
   */
  public getQuestionAnswers(id: string): Observable<Array<Answer>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var count: number = 0;
    var url: string = AppConfig.QUESTION_URL + '/' + id + AppConfig.ANSWERS_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) =>  Answer.toObjectArray(response.json()))
  }

  /**
   * Returns the list of correct answers by a questionnaire id.
   * @return Observable{Array<CorrectAnswer>} returns the list of correct answers
   */
  public getQuestionCorrectAnswers(id: string): Observable<Array<CorrectAnswer>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var count: number = 0;
    var url: string = AppConfig.QUESTION_URL + '/' + id + AppConfig.CORRECTANSWER_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) =>  CorrectAnswer.toObjectArray(response.json()))
  }

  /**
  * Method that saves the results of the questionnaire
  */
  public saveResults(student: Student, myQuestionnaire: Questionnaire,questionnaireName: string, questionnaireId: string, numTotalQuestions: number, numAnswerCorrect: number, numAnswerNoCorrect: number, finalNote: number, dataAnswers: Array<string>): Observable<ResultQuestionnaire> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.RESULTQUESTIONNAIRE_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.RESULTSQUESTIONNAIRE_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.RESULTSQUESTIONNAIRE_URL;
        break;
      default:
        break;
    }

    let postParams = {
      student: student,
      questionnaire: myQuestionnaire,
      questionnaireName: questionnaireName,
      questionnaireId: questionnaireId,
      numTotalQuestions: numTotalQuestions,
      numAnswerCorrect: numAnswerCorrect,
      numAnswerNoCorrect: numAnswerNoCorrect,
      finalNote: finalNote,
      studentId: this.utilsService.currentUser.userId,
      dataAnswers: dataAnswers
    }

    return this.http.post(url, postParams, options)
      .map((response: Response, index: number) => ResultQuestionnaire.toObject(response.json()))

  }

  /*public saveResultsNoteFinale(questionnaireId: string, numAnswerCorrect: number, numAnswerNoCorrect: number, finalNote: number): Observable<ResultQuestionnaire> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.RESULTQUESTIONNAIRE_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.RESULTSQUESTIONNAIRE_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.RESULTSQUESTIONNAIRE_URL;
        break;
      default:
        break;
    }

    let postParams = {
      questionnaireId: questionnaireId,
      numAnswerCorrect: numAnswerCorrect,
      numAnswerNoCorrect: numAnswerNoCorrect,
      finalNote: finalNote,
      studentId: this.utilsService.currentUser.userId
    }

    return this.http.post(url, postParams, options)
      .map((response: Response, index: number) => ResultQuestionnaire.toObject(response.json()))

  }*/

  /**
   * Returns the student by a id.
   * @return {Stuent} returns the student
   */
  public getMyStudent(id: number): Observable<Student> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    //var count: number = 0;
    var url: string = AppConfig.STUDENT_URL + '/' + id;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Student.toObject(response.json()))

  }

  /**
   * Returns the list of questions by a questionnaire id.
   * @return Observable{Array<Question>} returns the list of questions
   * that include the four possible answers and the correct answer
   */
  public getQuestionsAnswersCorrectAnswers(credentials: Credentials): Observable<Array<Question>> {

    var ret: Array<Question> = new Array<Question>();

    return Observable.create(observer => {
      this.getQuestionnaireQuestions(credentials).subscribe(
        questions => {
          questions.forEach(question => {
            this.getQuestionAnswers(question.id).subscribe(
              answers => {
                question.answer = answers;
                  this.getQuestionCorrectAnswers(question.id).subscribe(
                    correctAnswer => {
                      question.correctAnswer = correctAnswer;
                      ret.push(question);
                      if (ret.length === questions.length) {
                        observer.next(ret);
                        observer.complete();
                      }
                    }, error => observer.error(error))
              }, error => observer.error(error))
          });
        }, error => observer.error(error)
      )
    });
  }


  /**
   * This method executes a logout into the application, removes
   * the current logged user
   * @return {Observable<Boolean>} returns an observable with the result
   * of the operation
   */
  public logout(): Observable<Response> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + AppConfig.LOGOUT_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + AppConfig.LOGOUT_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + AppConfig.LOGOUT_URL;
        break;
      default:
        break;
    }

    return this.http.post(url, {}, options)
      .map(response => {
        this.utilsService.currentUser = null;
        return true;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
