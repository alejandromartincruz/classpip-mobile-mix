export class CorrectAnswer {

  private _id: string;
  private _name: string;

  constructor( id?: string, name?: string ) {
    this._id = id;
    this._name = name;
  }

  /* tslint:disable */
  static toObject(object: any): CorrectAnswer {
    /* tslint:enable */
    let result: CorrectAnswer = new CorrectAnswer();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<CorrectAnswer> {
    /* tslint:enable */
    let resultArray: Array<CorrectAnswer> = new Array<CorrectAnswer>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(CorrectAnswer.toObject(object[i]));
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
}
