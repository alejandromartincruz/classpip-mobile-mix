export class Answer {

  private _id: string;
  private _name: string;

  constructor( id?: string, name?: string ) {
    this._id = id;
    this._name = name;
  }

  /* tslint:disable */
  static toObject(object: any): Answer {
    /* tslint:enable */
    let result: Answer = new Answer();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Answer> {
    /* tslint:enable */
    let resultArray: Array<Answer> = new Array<Answer>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Answer.toObject(object[i]));
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
