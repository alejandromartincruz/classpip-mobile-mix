import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuestionnaireTextAreaPage } from './questionnaireTextArea';

let fixture: ComponentFixture<QuestionnaireTextAreaPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: QuestionnaireTextAreaPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuestionnaireTextAreaPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuestionnaireTextAreaPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
