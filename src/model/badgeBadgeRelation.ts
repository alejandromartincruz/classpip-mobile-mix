import {Badge} from "./badge";
import {BadgeRelation} from "./badgeRelation";

export class BadgeBadgeRelation{

  private _badge: Badge;
  private _badgeRelation: BadgeRelation;

  constructor(badge?: Badge, badgeRelation?: BadgeRelation){
    this._badge = badge;
    this._badgeRelation = badgeRelation;
  }

  public get badge(): Badge{
    return this._badge;
  }

  public set badge(value: Badge){
    this._badge = value;
  }

  public get badgeRelation(): BadgeRelation{
    return this._badgeRelation;
  }

  public set badgeRelation(value: BadgeRelation){
    this._badgeRelation = value;
  }

}
