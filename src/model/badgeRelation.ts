import { Student } from './student'
import { Badge } from './badge'

export class BadgeRelation {

  private _id: string;  
  private _value: number;  
  private _badgeId: number;
  private _groupId: number;
  private _studentId: number;
  private _schoolId: number;
  private _student: Student;
  private _badge: Badge;
  

  constructor(value?: number,  badgeId?: number, groupId?: number,  studentId?: number, schoolId?: number) {    
    this._value = value;    
    this._badgeId = badgeId;
	  this._groupId = groupId;
    this._studentId = studentId;
    this._schoolId = schoolId;      
  }
    
  /* tslint:disable */
  static toObject(object: any): BadgeRelation {
    /* tslint:enable */
    let result: BadgeRelation = new BadgeRelation();
    if (object != null) {
      result.id = object.id;      
      result.value = object.value;      
      result.badgeId = object.badgeId;
	    result.groupId = object.groupId;
      result.studentId = object.studentId;
      result.schoolId = object.schoolId;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<BadgeRelation> {
    /* tslint:enable */
    let resultArray: Array<BadgeRelation> = new Array<BadgeRelation>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(BadgeRelation.toObject(object[i]));
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

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get badgeId(): number {
    return this._badgeId;
  }

  public set badgeId(value: number) {
    this._badgeId = value;
  }
  
  public get groupId(): number {
    return this._groupId;
  }

  public set groupId(value: number) {
    this._groupId = value;
  }

  public get studentId(): number {
    return this._studentId;
  }

  public set studentId(value: number) {
    this._studentId = value;
  }

  public get schoolId(): number {
    return this._schoolId;
  }

  public set schoolId(value: number) {
    this._schoolId = value;
  }

  public get student(): Student {
    return this._student;
  }

  public set student(value: Student) {
    this._student = value;
  }

  public get badge(): Badge {
    return this._badge;
  }

  public set badge(value: Badge) {
    this._badge = value;
  }

}

