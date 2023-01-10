import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDamageComponent } from './item-damage.component';

describe('ItemDamageComponent', () => {
  let component: ItemDamageComponent;
  let fixture: ComponentFixture<ItemDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
