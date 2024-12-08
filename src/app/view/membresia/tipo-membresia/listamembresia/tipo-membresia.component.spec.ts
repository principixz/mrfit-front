import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMembresiaComponent } from './tipo-membresia.component';

describe('TipoMembresiaComponent', () => {
  let component: TipoMembresiaComponent;
  let fixture: ComponentFixture<TipoMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMembresiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
