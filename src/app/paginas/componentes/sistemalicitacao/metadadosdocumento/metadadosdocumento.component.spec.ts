import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadadosdocumentoComponent } from './metadadosdocumento.component';

describe('MetadadosdocumentoComponent', () => {
  let component: MetadadosdocumentoComponent;
  let fixture: ComponentFixture<MetadadosdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadadosdocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadadosdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
