import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Questionnaire1Page } from './questionnaire1';

let fixture: ComponentFixture<Questionnaire1Page> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: Questionnaire1Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Questionnaire1Page]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the Questionnaire1Page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
