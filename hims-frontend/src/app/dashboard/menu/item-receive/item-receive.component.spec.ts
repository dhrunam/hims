import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReceiveComponent } from './item-receive.component';

describe('ItemReceiveComponent', () => {
  let component: ItemReceiveComponent;
  let fixture: ComponentFixture<ItemReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReceiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
