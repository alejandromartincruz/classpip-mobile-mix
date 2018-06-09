import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { GetQuestionnairePage } from './getQuestionnaire';

let fixture: ComponentFixture<GetQuestionnairePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GetQuestionnairePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GetQuestionnairePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GetQuestionnairePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
