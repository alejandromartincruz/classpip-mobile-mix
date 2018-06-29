import {Student} from "./student";

export class StudentWithPoints {
  private _student: Student;
  private _totalPoints: number;

  constructor(student?: Student, selected?: number){
    this.student = student;
    this.totalPoints = selected;
  }

  public get student(): Student {
    return this._student;
  }
  public set student(value: Student){
    this._student = value;
  }
  public get totalPoints(): number {
    return this._totalPoints;
  }
  public set totalPoints(value: number){
    this._totalPoints = value;
  }
}
