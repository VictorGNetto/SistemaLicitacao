import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPreenchimentoDocumentoComponent } from './pg-preenchimento-documento.component';

describe('PgPreenchimentoDocumentoComponent', () => {
  let component: PgPreenchimentoDocumentoComponent;
  let fixture: ComponentFixture<PgPreenchimentoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPreenchimentoDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgPreenchimentoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
