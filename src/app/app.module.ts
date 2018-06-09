import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// application
import { MyApp } from './app.component';
import { AppConfig } from './app.config';
import { TimerComponent } from '../components/timer/timer';

// pages
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { RoleSelectPage } from '../pages/role-select/role-select';
import { SchoolPage } from '../pages/school/school';
import { PopoverPage } from '../pages/home/popover/popover';
import { ProfilePage } from '../pages/profile/profile';
import { TermsPage } from '../pages/profile/terms/terms';
import { HelpPage } from '../pages/profile/help/help';
import { TeachersPage } from '../pages/teachers/teachers';
import { TeacherPage } from '../pages/teachers/teacher/teacher';
import { StudentsPage } from '../pages/students/students';
import { StudentPage } from '../pages/students/student/student';
import { GroupPage } from '../pages/group/group';
import { GetQuestionnairePage } from '../pages/getQuestionnaire/getQuestionnaire';
import { QuestionnairePage } from '../pages/questionnaire/questionnaire';
import { Questionnaire1Page } from '../pages/questionnaire1/questionnaire1';
import { QuestionnaireTextAreaPage } from '../pages/questionnaireTextArea/questionnaireTextArea';
import { QuestionnaireTextArea1Page } from '../pages/questionnaireTextArea1/questionnaireTextArea1';
import { QuestionnaireImagePage } from '../pages/questionnaireImage/questionnaireImage';
import { QuestionnaireImage1Page } from '../pages/questionnaireImage1/questionnaireImage1';
import { ResultQuestionnairePage } from '../pages/resultQuestionnaire/resultQuestionnaire';
import { CompletedQuestionnairePage } from '../pages/completedQuestionnaire/completedQuestionnaire';
import { CompletedQuestionnaire1Page } from '../pages/completedQuestionnaire1/completedQuestionnaire1';

// pipes
import { OrderByIdPipe } from '../pipes/order-by-id.pipe';
import { OrderByNamePipe } from '../pipes/order-by-name.pipe';
import { OrderBySurnamePipe } from '../pipes/order-by-surname.pipe';

// services
import { IonicService } from '../providers/ionic.service';
import { HockeyAppService } from '../providers/hockeyapp.service';
import { AvatarService } from '../providers/avatar.service';
import { GradeService } from '../providers/grade.service';
import { GroupService } from '../providers/group.service';
import { LoginService } from '../providers/login.service';
import { MatterService } from '../providers/matter.service';
import { SchoolService } from '../providers/school.service';
import { UserService } from '../providers/user.service';
import { UtilsService } from '../providers/utils.service';
import { QuestionnaireService } from '../providers/questionnaire.service';
import { PointService } from '../providers/point.service';
import { PointRelationService } from '../providers/pointRelation.service';
import { BadgeService } from '../providers/badge.service';
import { BadgeRelationService } from '../providers/badgeRelation.service';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

export function exportTranslateStaticLoader(http: Http) {
  return new TranslateStaticLoader(http, AppConfig.LANG_PATH, AppConfig.LANG_EXT);
}

@NgModule({
  declarations: [
    // pages
    MyApp,
    LoginPage,
    MenuPage,
    HomePage,
    RoleSelectPage,
    SchoolPage,
    PopoverPage,
    ProfilePage,
    TermsPage,
    HelpPage,
    TeachersPage,
    TeacherPage,
    StudentsPage,
    StudentPage,
    GroupPage,
    GetQuestionnairePage,
    QuestionnairePage,
    Questionnaire1Page,
    QuestionnaireTextAreaPage,
    QuestionnaireTextArea1Page,
    QuestionnaireImagePage,
    QuestionnaireImage1Page,
    ResultQuestionnairePage,
    CompletedQuestionnairePage,
    CompletedQuestionnaire1Page,
    TimerComponent,
    // pipes
    OrderByIdPipe,
    OrderByNamePipe,
    OrderBySurnamePipe
  ],
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: exportTranslateStaticLoader,
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    HomePage,
    RoleSelectPage,
    SchoolPage,
    PopoverPage,
    ProfilePage,
    TermsPage,
    HelpPage,
    TeachersPage,
    TeacherPage,
    StudentsPage,
    StudentPage,
    GetQuestionnairePage,
    QuestionnairePage,
    Questionnaire1Page,
    QuestionnaireTextAreaPage,
    QuestionnaireTextArea1Page,
    QuestionnaireImagePage,
    QuestionnaireImage1Page,
    ResultQuestionnairePage,
    CompletedQuestionnairePage,
    CompletedQuestionnaire1Page,
    GroupPage,
  ],
  providers: [
    IonicService,
    HockeyAppService,
    AvatarService,
    GradeService,
    GroupService,
    LoginService,
    MatterService,
    SchoolService,
    UserService,
    UtilsService,
    QuestionnaireService,
    PointService,
    PointRelationService,
    BadgeService,
    BadgeRelationService,
    TimerComponent
  ]
})
export class AppModule { }
