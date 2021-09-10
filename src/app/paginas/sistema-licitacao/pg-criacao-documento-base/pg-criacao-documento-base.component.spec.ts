import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCriacaoDocumentoBaseComponent } from './pg-criacao-documento-base.component';

describe('PgCriacaoDocumentoBaseComponent', () => {
  let component: PgCriacaoDocumentoBaseComponent;
  let fixture: ComponentFixture<PgCriacaoDocumentoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgCriacaoDocumentoBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgCriacaoDocumentoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
