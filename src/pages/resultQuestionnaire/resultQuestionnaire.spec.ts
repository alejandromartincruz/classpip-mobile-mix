import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ResultQuestionnairePage } from './resultQuestionnaire';

let fixture: ComponentFixture<ResultQuestionnairePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: ResultQuestionnairePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ResultQuestionnairePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the ResultQuestionnairePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
