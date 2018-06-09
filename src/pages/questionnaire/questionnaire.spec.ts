import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { QuestionnairePage } from './questionnaire';

let fixture: ComponentFixture<QuestionnairePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: QuestionnairePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([QuestionnairePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the QuestionnairePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
