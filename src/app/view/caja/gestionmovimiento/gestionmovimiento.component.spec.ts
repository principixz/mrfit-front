import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionmovimientoComponent } from './gestionmovimiento.component';

describe('GestionmovimientoComponent', () => {
  let component: GestionmovimientoComponent;
  let fixture: ComponentFixture<GestionmovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionmovimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionmovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
