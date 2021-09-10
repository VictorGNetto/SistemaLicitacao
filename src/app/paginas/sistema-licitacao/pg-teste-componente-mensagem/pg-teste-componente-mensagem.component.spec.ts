import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTesteComponenteMensagemComponent } from './pg-teste-componente-mensagem.component';

describe('PgTesteComponenteMensagemComponent', () => {
  let component: PgTesteComponenteMensagemComponent;
  let fixture: ComponentFixture<PgTesteComponenteMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgTesteComponenteMensagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgTesteComponenteMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
