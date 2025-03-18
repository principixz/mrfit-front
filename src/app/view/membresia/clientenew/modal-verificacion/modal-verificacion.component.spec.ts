import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerificacionComponent } from './modal-verificacion.component';

describe('ModalVerificacionComponent', () => {
  let component: ModalVerificacionComponent;
  let fixture: ComponentFixture<ModalVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
