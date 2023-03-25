import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOperationsComponent } from './item-operations.component';

describe('ItemOperationsComponent', () => {
  let component: ItemOperationsComponent;
  let fixture: ComponentFixture<ItemOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
