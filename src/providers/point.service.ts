import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IonicService } from '../providers/ionic.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { UtilsService } from './utils.service';
import { AppConfig } from '../app/app.config';
import { School } from '../model/school';
import { Role } from '../model/role';
import { Avatar } from '../model/avatar';
import { Teacher } from '../model/teacher';
import { Student } from '../model/student';
import { Point } from '../model/point';
import { Grade } from '../model/grade';
import { Matter } from '../model/matter';


@Injectable()
export class PointService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * This method returns the profile information of the current logged
   * in user on the platform
   * @return {Observable<Profile>} returns an observable with the profile
   */


  /**public getPoints(): Observable<Array<Point>> {

    var count = 0;

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMySchoolUrl() + AppConfig.POINTS_URL;



  }
 */
  /**
   * Returns a grade object with all the information from a grade
   * identifier. This method is used to fill all the information
   * of the groups we are querying
   * @return {Grade} grade object with all the information
   */
  public getPoint(id: number): Observable<Point> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    return this.http.get(AppConfig.POINT_URL + '/' + id, options)
      .map((response: Response, index: number) => Point.toObject(response.json()))
  }

  public getPointName(id: number): Observable<Point> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    return this.http.get(AppConfig.POINT_URL + '/' + id, options)
      .map((response: Response, index: number) => Point.toObject(response.json()))
  }




/**
   * Returns the list of students by a group id.
   * @return {Array<Point>} returns the list of points
   */
   private getMySchoolPoints(): Observable<Array<Point>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = this.utilsService.getMySchoolUrl() + AppConfig.POINT_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Point.toObjectArray(response.json()))
  }


  /**
   * This method calls the REST API for performing a post of point against
   * the common services for the application
   * @param {Point} point Object with login credentials
   * @return {Observable<Point>} observable object with the login response
   */
  public postPoint(point: Point): Observable<Response> {

	let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

	var url: string;
	url = AppConfig.POINT_URL;

    return this.http.post(url, point)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  public savePoint(name: string, value: number, image: string): Observable<Point> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string;
    url = AppConfig.POINT_URL;
    let postParams = {
      name: name,
      value: value,
      image: image,
      teacherId: this.utilsService.currentUser.userId,
      schoolId: this.utilsService.currentSchool.id
    }

    return this.http.post(url, postParams, options)
      .map(response => {

        return Point.toObject(response.json());
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  public deletePoint(id: string): Observable<Point> {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    return this.http.delete(AppConfig.POINT_URL + '/' + id, options)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
