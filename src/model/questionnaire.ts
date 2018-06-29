export class Questionnaire {

  private _id: string;
  private _name: string;
  private _date: string;
  private _points: number [];
  private _badges: string [];
  private _groupid: string;
  private _active: boolean;

  constructor(id?: string, name?: string, date?: string, points?: number[], active?: boolean) {
      this._id = id;
      this._name = name;
      this._date = date;
      this._points = points;
      this._active = active;
  }

  /* tslint:disable */
  static toObject(object: any): Questionnaire {
    /* tslint:enable */
    let result: Questionnaire = new Questionnaire();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.date = object.date;
      result.points = object.points;
      result.groupid = object.groupid;
      result.badges = object.badges;
      result.active = object.active;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Questionnaire> {
    /* tslint:enable */
    let resultArray: Array<Questionnaire> = new Array<Questionnaire>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Questionnaire.toObject(object[i]));
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
  public get date(): string {
    return this._date;
  }

  public set date(value: string) {
    this._date = value;
  }
  public get points(): number[] {
    return this._points;
  }

  public set points(value: number[]) {
    this._points = value;
  }
  public get groupid(): string {
    return this._groupid;
  }

  public set groupid(value: string) {
    this._groupid = value;
  }
  public get badges(): string[] {
    return this._badges;
  }

  public set badges(value: string[]) {
    this._badges = value;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
  }
}
