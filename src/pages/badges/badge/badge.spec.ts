import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { BadgePage } from './badge';
import {} from 'jasmine';

let fixture: ComponentFixture<BadgePage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: BadgePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([BadgePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the BadgePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
