export class AppConfig {

  // Server connection
 // public static get SERVER_URL(): string { return 'https://api.classpip.com'; } // PRO
  public static get SERVER_URL(): string { return 'http://localhost:3000'; } // DEV

  public static get TEACHER_URL(): string { return this.SERVER_URL + '/api/teachers'; }
  public static get STUDENT_URL(): string { return this.SERVER_URL + '/api/students'; }
  public static get SCHOOLADMIN_URL(): string { return this.SERVER_URL + '/api/schooladministrators'; }
  public static get SCHOOL_URL(): string { return this.SERVER_URL + '/api/schools'; }
  public static get AVATARS_URL(): string { return this.SERVER_URL + '/api/avatars'; }
  public static get MATTERS_URL(): string { return this.SERVER_URL + '/api/matters'; }
  public static get GRADES_URL(): string { return this.SERVER_URL + '/api/grades'; }
  public static get GROUP_URL(): string { return this.SERVER_URL + '/api/groups'; }
  public static get QUESTIONNAIRE_URL(): string { return this.SERVER_URL + '/api/questionnaires'; }
  public static get QUESTION_URL(): string { return this.SERVER_URL + '/api/questions'; }
  public static get ANSWER(): string { return this.SERVER_URL + '/api/answers'; }
  public static get RESULTQUESTIONNAIRE_URL(): string { return this.SERVER_URL + '/api/ResultQuestionnaires'; }
  public static get POINT_URL(): string { return this.SERVER_URL + '/api/points'; }
  public static get BADGE_URL(): string { return this.SERVER_URL + '/api/badges'; }
  public static get POINTRELATION_URL(): string { return this.SERVER_URL + '/api/pointRelations'; }
  public static get BADGERELATION_URL(): string { return this.SERVER_URL + '/api/badgeRelations'; }
  public static get COLLECTION_URL(): string { return this.SERVER_URL + '/api/collectionCards'; }
  public static get CARD_URL(): string { return this.SERVER_URL + '/api/cards'; }

  public static get LOGIN_URL(): string { return '/login'; }
  public static get LOGOUT_URL(): string { return '/logout'; }
  public static get MYSCHOOL_URL(): string { return '/school'; }
  public static get AVATAR_URL(): string { return '/avatar'; }
  public static get TEACHERS_URL(): string { return '/teachers'; }
  public static get STUDENTS_URL(): string { return '/students'; }
  public static get COUNT_URL(): string { return '/count'; }
  public static get GROUPS_URL(): string { return '/groups'; }
  public static get GETQUESTIONNAIRE_URL(): string { return '/getQuestionnaire'; }
  public static get QUESTIONNAIRES_URL(): string { return '/questionnaires'; }
  public static get QUESTIONS_URL(): string { return '/questions'; }
  public static get ANSWERS_URL(): string { return '/answers'; }
  public static get CORRECTANSWER_URL(): string { return '/correctAnswers'; }
  public static get RESULTSQUESTIONNAIRE_URL(): string { return '/ResultQuestionnaires'; }
  public static get COLLECTIONS_URL(): string { return '/collectionCards'; }
  public static get CARDS_URL(): string { return '/cards'; }
  public static get POINTS_URL(): string { return '/points'; }
  public static get BADGES_URL(): string { return '/badges'; }
  public static get POINTSRELATION_URL(): string { return '/pointRelations'; }
  public static get BADGESRELATION_URL(): string { return '/badgeRelations'; }


  public static get AUTH_HEADER(): string { return 'Authorization'; }

  // Errors
  public static get LOGIN_FAILED(): string { return 'LOGIN_FAILED'; }
  public static get LOGIN_FAILED_EMAIL_NOT_VERIFIED(): string { return 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'; }

  // i18n configuration
  public static get LANG(): string { return 'ca'; }
  public static get LANG_PATH(): string { return 'assets/i18n'; }
  public static get LANG_EXT(): string { return '.json'; }

  // HockeyApp configuration
  public static get HA_ANDROID(): string { return '28e430f7c3ff43a09612241131067b87'; }
  public static get HA_IOS(): string { return '48f58abaa6f5465593b8dc2db7e924c2'; }

}
