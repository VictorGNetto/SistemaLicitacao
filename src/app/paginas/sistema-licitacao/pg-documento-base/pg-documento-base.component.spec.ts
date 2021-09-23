import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDocumentoBaseComponent } from './pg-documento-base.component';

describe('PgDocumentoBaseComponent', () => {
  let component: PgDocumentoBaseComponent;
  let fixture: ComponentFixture<PgDocumentoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgDocumentoBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgDocumentoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
