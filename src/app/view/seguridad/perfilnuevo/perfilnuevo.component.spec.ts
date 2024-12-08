import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilnuevoComponent } from './perfilnuevo.component';

describe('PerfilnuevoComponent', () => {
  let component: PerfilnuevoComponent;
  let fixture: ComponentFixture<PerfilnuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilnuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilnuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
