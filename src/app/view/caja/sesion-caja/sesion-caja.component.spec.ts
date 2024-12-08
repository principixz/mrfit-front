import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionCajaComponent } from './sesion-caja.component';

describe('SesionCajaComponent', () => {
  let component: SesionCajaComponent;
  let fixture: ComponentFixture<SesionCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
