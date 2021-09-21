import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOpcoesComponent } from './item-opcoes.component';

describe('ItemOpcoesComponent', () => {
  let component: ItemOpcoesComponent;
  let fixture: ComponentFixture<ItemOpcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOpcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
