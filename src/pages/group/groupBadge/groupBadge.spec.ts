import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { GroupBadgePage } from './groupBadge';
import {} from 'jasmine';

let fixture: ComponentFixture<GroupBadgePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GroupBadgePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GroupBadgePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GroupBadgePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
