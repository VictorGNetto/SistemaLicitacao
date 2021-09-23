import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgSistemaLicitacaoComponent } from './pg-sistema-licitacao.component';

describe('PgSistemaLicitacaoComponent', () => {
  let component: PgSistemaLicitacaoComponent;
  let fixture: ComponentFixture<PgSistemaLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgSistemaLicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgSistemaLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
