export class Card {

  private _id: string;
  private _name: string;
  private _image: string;
  private _collectionId: string;
  private _ratio: string;
  private _rank: string;

  constructor(id?: string, name?: string, image?: string, collectionId?: string, ratio?: string, rank?: string) {
    this._id = id;
    this._name = name;
    this._image = image;
    this._collectionId = collectionId;
    this._ratio = ratio;
    this._rank = rank;
  }

  /* tslint:disable */
  static toObject(object: any): Card {
    /* tslint:enable */
    let result: Card = new Card();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.image = object.image;
      result.collectionId = object.collectionId;
      result.ratio = object.ratio;
      result.rank = object.rank;
    }
    return result;
  }
  /* tslint:disable */
  static toObjectArray(object: any): Array<Card> {
    /* tslint:enable */
    let resultArray: Array<Card> = new Array<Card>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Card.toObject(object[i]));
      }
    }
    return resultArray;
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

  get collectionId(): string {
    return this._collectionId;
  }

  set collectionId(value: string) {
    this._collectionId = value;
  }

  get ratio(): string {
    return this._ratio;
  }

  set ratio(value: string) {
    this._ratio = value;
  }

  get rank(): string {
    return this._rank;
  }

  set rank(value: string) {
    this._rank = value;
  }
}
