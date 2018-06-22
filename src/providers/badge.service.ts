import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';
import { AppConfig } from '../app/app.config';
import { School } from '../model/school';
import { Role } from '../model/role';
import { Avatar } from '../model/avatar';
import { Teacher } from '../model/teacher';
import { Student } from '../model/student';
import { Badge } from '../model/badge';
import { Grade } from '../model/grade';
import { Matter } from '../model/matter';
import { IonicService } from '../providers/ionic.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class BadgeService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * This method returns the profile information of the current logged
   * in user on the platform
   * @return {Observable<Profile>} returns an observable with the profile
   */


  /**public getBadges(): Observable<Array<Badge>> {

    var count = 0;

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMySchoolUrl() + AppConfig.BADGES_URL;



  }
 */
  /**
   * Returns a grade object with all the information from a grade
   * identifier. This method is used to fill all the information
   * of the groups we are querying
   * @return {Grade} grade object with all the information
   */
  public getBadge(id: number): Observable<Badge> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    return this.http.get(AppConfig.BADGE_URL + '/' + id, options)
      .map((response: Response, index: number) => Badge.toObject(response.json()))
  }

  public saveBadge(name: string, value: number, image: string): Observable<Badge> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string;
    url = AppConfig.BADGE_URL;
    let postParams = {
      name: name,
      value: value,
      image: image,
      teacherId: this.utilsService.currentUser.userId,
      schoolId: this.utilsService.currentSchool.id
    }

    return this.http.post(url, postParams, options)
      .map(response => {

        return Badge.toObject(response.json());
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  public deleteBadge(id: string): Observable<Badge> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    return this.http.delete(AppConfig.BADGE_URL + '/' + id, options)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  public getBadgeName(id: number): Observable<Badge> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    return this.http.get(AppConfig.BADGE_URL + '/' + id, options)
      .map((response: Response, index: number) => Badge.toObject(response.json()))
  }




/**
   * Returns the list of students by a group id.
   * @return {Array<Badge>} returns the list of badges
   */
   private getMySchoolBadges(): Observable<Array<Badge>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = this.utilsService.getMySchoolUrl() + AppConfig.BADGE_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Badge.toObjectArray(response.json()))
  }


  /**
   * This method calls the REST API for performing a post of badge against
   * the common services for the application
   * @param {Badge} badge Object with login credentials
   * @return {Observable<Badge>} observable object with the login response
   */
  public postBadge(badge: Badge): Observable<Response> {

	let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

	var url: string;
	url = AppConfig.BADGE_URL;

    return this.http.post(url, badge)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
}
