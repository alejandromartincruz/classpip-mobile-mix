import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { GroupBadgeCreatePage } from './groupBadgeCreate';
import {} from 'jasmine';

let fixture: ComponentFixture<GroupBadgeCreatePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GroupBadgeCreatePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GroupBadgeCreatePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GroupBadgeCreatePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
