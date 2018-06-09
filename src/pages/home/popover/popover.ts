import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { LoginService } from '../../../providers/login.service';
import { RoleSelectPage } from '../../../pages/role-select/role-select';
import { ProfilePage } from '../../../pages/profile/profile';
import { GetQuestionnairePage } from '../../../pages/getQuestionnaire/getQuestionnaire';

@Component({
  selector: 'page-popover',
  templateUrl: './popover.html'
})
export class PopoverPage {

  private navController: NavController;

  constructor(
    public loginService: LoginService,
    public navParams: NavParams,
    public viewController: ViewController) {
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.navController = this.navParams.data.nav;
  }

  /**
   * Method for calling the logout service
   */
  public logout(): void {
    this.viewController.dismiss().then(
      value => this.loginService.logout().subscribe(
        success => this.navController.setRoot(RoleSelectPage),
        error => location.reload()));

  }

  /**
   * Method for displaying the profile page
   */
  public showProfile(): void {
    this.viewController.dismiss()
      .then(value => this.navController.push(ProfilePage));
  }

    /**
   * Method for displaying the loginQuestionnaire page
   */
  public goToGetQuestionnaire(): void {
    this.viewController.dismiss()
      .then(value => this.navController.push(GetQuestionnairePage));
  }
}
