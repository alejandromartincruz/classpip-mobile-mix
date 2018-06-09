import { Answer} from './answer'
import { CorrectAnswer} from './correctAnswer'

export class Question {

  private _id: string;
  private _name: string;
  private _type: string;
  private _image: string;
  private _time: number;
  private _answer: Array<Answer>;
  private _correctAnswer: Array<CorrectAnswer>;

  constructor( id?: string, name?: string, type?: string, image?: string, time?: number ) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._image = image;
    this._time = time;
  }

  /* tslint:disable */
  static toObject(object: any): Question {
    /* tslint:enable */
    let result: Question = new Question();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.type = object.type;
      result.image = object.image;
      result.time = object.time;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Question> {
    /* tslint:enable */
    let resultArray: Array<Question> = new Array<Question>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Question.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }

  public get time(): number {
    return this._time;
  }

  public set time(value: number) {
    this._time = value;
  }

  public get answer(): Array<Answer> {
    return this._answer;
  }

  public set answer(value: Array<Answer>) {
    this._answer = value;
  }

  public get correctAnswer(): Array<CorrectAnswer> {
    return this._correctAnswer;
  }

  public set correctAnswer(value: Array<CorrectAnswer>) {
    this._correctAnswer = value;
  }
}
