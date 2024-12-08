import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarAsistenciaComponent } from './validar-asistencia.component';

describe('ValidarAsistenciaComponent', () => {
  let component: ValidarAsistenciaComponent;
  let fixture: ComponentFixture<ValidarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
