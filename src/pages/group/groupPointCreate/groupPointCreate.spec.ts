import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { GroupPointCreatePage } from './groupPointCreate';
import {} from 'jasmine';

let fixture: ComponentFixture<GroupPointCreatePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GroupPointCreatePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GroupPointCreatePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GroupPointCreatePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
