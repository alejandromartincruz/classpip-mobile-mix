import {Point} from "./point";
import {PointRelation} from "./pointRelation";

export class PointPointRelation{

  private _point: Point;
  private _pointRelation: PointRelation;

  constructor(point?: Point, pointRelation?: PointRelation){
    this._point = point;
    this._pointRelation = pointRelation;
  }

  public get point(): Point {
    return this._point;
  }

  public set point(value: Point) {
    this._point = value;
  }

  public get pointRelation(): PointRelation {
    return this._pointRelation;
  }

  public set pointRelation(value: PointRelation) {
    this._pointRelation = value;
  }


}
