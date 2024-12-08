import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlatoComponent } from './registrar-plato.component';

describe('RegistrarPlatoComponent', () => {
  let component: RegistrarPlatoComponent;
  let fixture: ComponentFixture<RegistrarPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPlatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
