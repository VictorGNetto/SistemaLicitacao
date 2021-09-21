import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTextoComponent } from './item-texto.component';

describe('ItemTextoComponent', () => {
  let component: ItemTextoComponent;
  let fixture: ComponentFixture<ItemTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
