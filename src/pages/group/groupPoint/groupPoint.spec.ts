import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { GroupPointPage } from './groupPoint';
import {} from 'jasmine';

let fixture: ComponentFixture<GroupPointPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: GroupPointPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([GroupPointPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the GroupPointPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
