import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { GroupPage } from './group';
import {} from 'jasmine';

let fixture: ComponentFixture<GroupPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GroupPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GroupPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GroupPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
