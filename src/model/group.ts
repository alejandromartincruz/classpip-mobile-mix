import { Grade } from './grade';
import { Matter } from './matter';
import { Student } from './student';

export class Group {

  private _id: string;
  private _name: string;
  private _gradeId: number;
  private _matterId: number;
  private _matter: Matter;
  private _grade: Grade;
  private _students: Array<Student>;

  constructor(id?: string, name?: string, gradeId?: number, matterId?: number,
    matter?: Matter, grade?: Grade, students?: Array<Student>) {
    this._id = id;
    this._name = name;
    this._gradeId = gradeId;
    this._matterId = matterId;
    this._matter = matter;
    this._grade = grade;
    this._students = students;
  }

  /* tslint:disable */
  static toObject(object: any): Group {
    /* tslint:enable */
    let result: Group = new Group();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.gradeId = object.gradeId;
      result.matterId = object.matterId;
      result.students = object.students;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Group> {
    /* tslint:enable */
    let resultArray: Array<Group> = new Array<Group>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Group.toObject(object[i]));
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

  public get gradeId(): number {
    return this._gradeId;
  }

  public set gradeId(value: number) {
    this._gradeId = value;
  }

  public get matterId(): number {
    return this._matterId;
  }

  public set matterId(value: number) {
    this._matterId = value;
  }

  public get matter(): Matter {
    return this._matter;
  }

  public set matter(value: Matter) {
    this._matter = value;
  }

  public get grade(): Grade {
    return this._grade;
  }

  public set grade(value: Grade) {
    this._grade = value;
  }

  public get students(): Array<Student> {
    return this._students;
  }

  public set students(value: Array<Student>) {
    this._students = value;
  }


}
