import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReturnComponent } from './item-return.component';

describe('ItemReturnComponent', () => {
  let component: ItemReturnComponent;
  let fixture: ComponentFixture<ItemReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
