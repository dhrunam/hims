import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDepartmentComponent } from './map-department.component';

describe('MapDepartmentComponent', () => {
  let component: MapDepartmentComponent;
  let fixture: ComponentFixture<MapDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
