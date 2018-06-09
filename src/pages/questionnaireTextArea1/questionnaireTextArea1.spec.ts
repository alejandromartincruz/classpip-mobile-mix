import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuestionnaireTextArea1Page } from './questionnaireTextArea1';

let fixture: ComponentFixture<QuestionnaireTextArea1Page> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: QuestionnaireTextArea1Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuestionnaireTextArea1Page]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuestionnaireTextArea1Page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
