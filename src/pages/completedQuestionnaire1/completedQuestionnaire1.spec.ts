import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { CompletedQuestionnaire1Page } from './completedQuestionnaire1';

let fixture: ComponentFixture<CompletedQuestionnaire1Page> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: CompletedQuestionnaire1Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([CompletedQuestionnaire1Page]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the CompletedQuestionnaire1Page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
