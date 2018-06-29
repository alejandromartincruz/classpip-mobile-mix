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
import {CollectionTpage} from "../pages/collection/collection-teacher/collection-teacher";
import {CollectionCreate} from "../pages/collection/collection-teacher/create-collection/create-collection";
import {CollectionTeacherDetail} from "../pages/collection/collection-teacher/collection-teacher-detail/collection-teacher-detail";
import {CollectionSpage} from "../pages/collection/collection-student/collection-student";
import {CollectionStudentDetail} from "../pages/collection/collection-student/collection-student-detail/collection-student-detail";
import {CollectionAssign} from "../pages/collection/collection-teacher/assign-collection/assign-collection";
import {CollectionEdit} from "../pages/collection/collection-teacher/edit-collection/edit-collection";
import {CollectionsAssigned} from "../pages/collection/collection-teacher/assigned-collections/assigned-collections";
import {CardCreate} from "../pages/collection/collection-teacher/create-card/create-card";
import {CardEdit} from "../pages/collection/collection-teacher/edit-card/edit-card";
import {CardAssign} from "../pages/collection/collection-teacher/assign-card/assign-card";
import {CardAssignStudent} from "../pages/collection/collection-teacher/assign-card/assign-card-student/assign-card-student";
import {BadgePage} from "../pages/pointsAndBadges/badgeDetail/badge";
import {PointPage} from "../pages/pointsAndBadges/pointDetails/point";
import {GroupBadgeCreatePage} from "../pages/group/groupBadgeCreate/groupBadgeCreate";
import {GroupBadgePage} from "../pages/group/groupBadge/groupBadge";
import {GroupPointCreatePage} from "../pages/group/groupPointCreate/groupPointCreate";
import {PointsAndBadgesPage} from "../pages/pointsAndBadges/pointsAndBadges";
import {AssignPointsPage} from "../pages/pointsAndBadges/assignPoints/assignPoints";
import {AssignBadgesPage} from "../pages/pointsAndBadges/assignBadges/assignBadges";
import {GroupPointPage} from "../pages/group/groupPoint/groupPoint";
import {listStudentTotalsPage} from "../pages/pointsAndBadges/listStudentTotals/listStudentTotals";

// pipes
import { OrderByIdPipe } from '../pipes/order-by-id.pipe';
import { OrderByNamePipe } from '../pipes/order-by-name.pipe';
import { OrderBySurnamePipe } from '../pipes/order-by-surname.pipe';
import {OrderByTotalPointsPipe} from "../pipes/order-by-totalPoints.pipe";

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
import {CollectionService} from "../providers/collection.service";
import {UploadImageService} from "../providers/uploadImage.service";



// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import { Camera } from "@ionic-native/camera";
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";

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
    CollectionTpage,
    CollectionCreate,
    CollectionTeacherDetail,
    CollectionSpage,
    CollectionStudentDetail,
    CollectionAssign,
    CollectionEdit,
    CollectionsAssigned,
    CardCreate,
    CardEdit,
    CardAssign,
    CardAssignStudent,
    BadgePage,
    GroupPointPage,
    GroupPointCreatePage,
    GroupBadgeCreatePage,
    GroupBadgePage,
    PointPage,
    PointsAndBadgesPage,
    AssignPointsPage,
    AssignBadgesPage,
    listStudentTotalsPage,
    // pipes
    OrderByIdPipe,
    OrderByNamePipe,
    OrderBySurnamePipe,
    OrderByTotalPointsPipe
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
    CollectionTpage,
    CollectionCreate,
    CollectionTeacherDetail,
    CollectionSpage,
    CollectionStudentDetail,
    CollectionAssign,
    CollectionEdit,
    CollectionsAssigned,
    CardCreate,
    CardEdit,
    CardAssign,
    CardAssignStudent,
    PointPage,
    BadgePage,
    GroupPointPage,
    GroupBadgeCreatePage,
    GroupBadgePage,
    GroupPointCreatePage,
    GroupPage,
    PointsAndBadgesPage,
    AssignPointsPage,
    AssignBadgesPage,
    listStudentTotalsPage
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
    TimerComponent,
    CollectionService,
    UploadImageService,
    File,
    Transfer,
    Camera,
    FilePath,
    PointService,
    BadgeService,
    PointRelationService,
    BadgeRelationService
  ]
})
export class AppModule { }
