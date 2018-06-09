import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { CompletedQuestionnairePage } from './completedQuestionnaire';

let fixture: ComponentFixture<CompletedQuestionnairePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: CompletedQuestionnairePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([CompletedQuestionnairePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the CompletedQuestionnairePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
