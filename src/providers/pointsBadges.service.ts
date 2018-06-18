import {Injectable} from "@angular/core";
import {UtilsService} from "./utils.service";
import {Http} from "@angular/http";

@Injectable()
export class BadgeService {

  constructor(public http: Http,
              public utilsService: UtilsService) {
  }
}
