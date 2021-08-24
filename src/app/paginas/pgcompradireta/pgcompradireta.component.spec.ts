import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgcompradiretaComponent } from './pgcompradireta.component';

describe('PgcompradiretaComponent', () => {
  let component: PgcompradiretaComponent;
  let fixture: ComponentFixture<PgcompradiretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgcompradiretaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgcompradiretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
