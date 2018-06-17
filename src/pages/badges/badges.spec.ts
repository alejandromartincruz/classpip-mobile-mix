import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { BadgesPage } from './badges';
import {} from 'jasmine';

let fixture: ComponentFixture<BadgesPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: BadgesPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([BadgesPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the BadgesPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
