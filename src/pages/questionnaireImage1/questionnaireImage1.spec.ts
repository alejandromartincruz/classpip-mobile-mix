import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuestionnaireImage1Page } from './questionnaireImage1';

let fixture: ComponentFixture<QuestionnaireImage1Page> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: Questionnaire1ImagePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuestionnaireImage1Page]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuestionnaireImage1Page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
