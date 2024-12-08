import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialcajaComponent } from './historialcaja.component';

describe('HistorialcajaComponent', () => {
  let component: HistorialcajaComponent;
  let fixture: ComponentFixture<HistorialcajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialcajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialcajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
