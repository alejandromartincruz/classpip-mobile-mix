import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PointsPage } from './points';
import {} from 'jasmine';

let fixture: ComponentFixture<PointsPage> = null;
/* tslint:disable */
let instance: any = null;
/* tslint:enable */

describe('Pages: PointsPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([PointsPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the PointsPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
