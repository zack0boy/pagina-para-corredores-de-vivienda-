import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFilter } from './property-filter';

describe('PropertyFilter', () => {
  let component: PropertyFilter;
  let fixture: ComponentFixture<PropertyFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
