import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevamembresiaComponent } from './nuevamembresia.component';

describe('NuevamembresiaComponent', () => {
  let component: NuevamembresiaComponent;
  let fixture: ComponentFixture<NuevamembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevamembresiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevamembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
