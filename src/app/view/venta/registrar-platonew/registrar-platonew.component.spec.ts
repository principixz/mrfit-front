import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlatonewComponent } from './registrar-platonew.component';

describe('RegistrarPlatonewComponent', () => {
  let component: RegistrarPlatonewComponent;
  let fixture: ComponentFixture<RegistrarPlatonewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPlatonewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPlatonewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
