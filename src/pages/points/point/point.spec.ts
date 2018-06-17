import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { PointPage } from './point';
import {} from 'jasmine';

let fixture: ComponentFixture<PointPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: PointPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([PointPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the PointPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
