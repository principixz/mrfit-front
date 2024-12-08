import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEmpleadoComponent } from './reporte-empleado.component';

describe('ReporteEmpleadoComponent', () => {
  let component: ReporteEmpleadoComponent;
  let fixture: ComponentFixture<ReporteEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
