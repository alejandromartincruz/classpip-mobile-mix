import {CollectionService} from "../providers/collection.service";

export class CollectionCard {

  private _id: string;
  private _name: string;
  private _image: string;
  private _num: string;
  private _createdBy: string;

  constructor(id?: string, name?: string, image?: string, num?: string, createdBy?: string) {
    this._id = id;
    this._name = name;
    this._image = image;
    this._num = num;
    this._createdBy = createdBy;

  }

  /* tslint:disable */
  static toObject(object: any): CollectionCard {
    /* tslint:enable */
    let result: CollectionCard = new CollectionCard();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.image = object.image;
      result.num = object.num;
      result.createdBy = object.createdBy;
    }
    return result;
  }
  /* tslint:disable */
  static toObjectArray(object: any): Array<CollectionCard> {
    /* tslint:enable */
    let resultArray: Array<CollectionCard> = new Array<CollectionCard>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(CollectionCard.toObject(object[i]));
      }
    }
    return resultArray;
  }

  /* tslint:disable */
  static toObjectNumber(object: any): String {
    /* tslint:enable */
    let result: string;
    if (object != null) {
      result = object.count;
    }
    return result;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get num(): string {
    return this._num;
  }

  set num(value: string) {
    this._num = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }
}
