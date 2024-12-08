import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoslistaComponent } from './permisoslista.component';

describe('PermisoslistaComponent', () => {
  let component: PermisoslistaComponent;
  let fixture: ComponentFixture<PermisoslistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisoslistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
