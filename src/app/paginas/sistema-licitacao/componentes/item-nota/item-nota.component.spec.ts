import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNotaComponent } from './item-nota.component';

describe('ItemNotaComponent', () => {
  let component: ItemNotaComponent;
  let fixture: ComponentFixture<ItemNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
