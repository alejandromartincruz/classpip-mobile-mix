import {Student} from "./student";

export class StudentsSelected {
  private _student: Student;
  private _selected: Boolean;

  constructor(student?: Student, selected?: Boolean){
    this.student = student;
    this.selected = selected;
  }

  public get student(): Student {
    return this._student;
  }
  public set student(value: Student){
    this._student = value;
  }
  public get selected(): Boolean {
    return this._selected;
  }
  public set selected(value: Boolean){
    this._selected = value;
  }
}
