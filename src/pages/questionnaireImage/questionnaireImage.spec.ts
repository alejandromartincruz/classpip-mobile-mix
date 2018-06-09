import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuestionnaireImagePage } from './questionnaireImage';

let fixture: ComponentFixture<QuestionnaireImagePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: QuestionnaireImagePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuestionnaireImagePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuestionnaireImagePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
