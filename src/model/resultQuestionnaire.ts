import { Questionnaire } from './questionnaire';
import { Student } from './student';

export class ResultQuestionnaire {

  private _id: string;
  private _questionnaireName: string;
  private _questionnaireId: number;
  private _questionnaire: Questionnaire;
  private _numTotalQuestions: number;
  private _numAnswerCorrect: number;
  private _numAnswerNoCorrect: number;
  private _finalNote: number;
  private _studentId: number;
  private _student: Student;
  private _dataAnswers: Array<string>;


  constructor(id?: string, questionnaire?: Questionnaire, questionnaireName?: string, questionnaireId?: number, numTotalQuestions?: number, numAnswerCorrect?: number, numAnswerNoCorrect?: number, finalNote?: number, studentId?: number, student?: Student, dataAnswers?: Array<string>) {
    this._id = id;
    this._questionnaire = questionnaire;
    this._questionnaireName = questionnaireName;
    this._questionnaireId = questionnaireId;
    this._numTotalQuestions = numTotalQuestions;
    this._numAnswerCorrect = numAnswerCorrect;
    this._numAnswerNoCorrect = numAnswerNoCorrect;
    this._finalNote = finalNote;
    this._studentId = studentId;
    this._student = student;
    this._dataAnswers = dataAnswers;
  }

  /* tslint:disable */
  static toObject(object: any): ResultQuestionnaire {
    /* tslint:enable */
    let result: ResultQuestionnaire = new ResultQuestionnaire();
    if (object != null) {
      result.id = object.id;
      result.questionnaire = object.questionnaire;
      result.questionnaireName = object.questionnaireName;
      result.questionnaireId = object.questionnaireId;
      result.numTotalQuestions = object.numTotalQuestions;
      result.numAnswerCorrect = object.numAnswerCorrect;
      result.numAnswerNoCorrect = object.numAnswerNoCorrect;
      result.finalNote = object.finalNote;
      result.studentId = object.studentId;
      result.student = object.student;
      result.dataAnswers = object.dataAnswers;
    }
    return result;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get questionnaireName(): string {
    return this._questionnaireName;
  }

  public set questionnaireName(value: string) {
    this._questionnaireName = value;
  }

  public get questionnaireId(): number {
    return this._questionnaireId;
  }

  public set questionnaireId(value: number) {
    this._questionnaireId = value;
  }

  public get questionnaire(): Questionnaire {
    return this._questionnaire;
  }

  public set questionnaire(value: Questionnaire) {
    this._questionnaire = value;
  }

  public get numTotalQuestions(): number {
    return this._numTotalQuestions;
  }

  public set numTotalQuestions(value: number) {
    this._numTotalQuestions = value;
  }

  public get numAnswerCorrect(): number {
    return this._numAnswerCorrect;
  }

  public set numAnswerCorrect(value: number) {
    this._numAnswerCorrect = value;
  }

  public get numAnswerNoCorrect(): number {
    return this._numAnswerNoCorrect;
  }

  public set numAnswerNoCorrect(value: number) {
    this._numAnswerNoCorrect = value;
  }

  public get finalNote(): number {
    return this._finalNote;
  }

  public set finalNote(value: number) {
    this._finalNote = value;
  }

  public get studentId(): number {
    return this._studentId;
  }

  public set studentId(value: number) {
    this._studentId = value;
  }

  public get student(): Student {
    return this._student;
  }

  public set student(value: Student) {
    this._student = value;
  }

  public get dataAnswers(): Array<string> {
    return this._dataAnswers;
  }

  public set dataAnswers(value: Array<string>) {
    this._dataAnswers = value;
  }

}
