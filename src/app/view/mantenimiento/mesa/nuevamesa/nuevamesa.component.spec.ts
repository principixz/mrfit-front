import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevamesaComponent } from './nuevamesa.component';

describe('NuevamesaComponent', () => {
  let component: NuevamesaComponent;
  let fixture: ComponentFixture<NuevamesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevamesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevamesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
