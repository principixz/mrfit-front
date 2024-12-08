import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoDesactivarComponent } from './plato-desactivar.component';

describe('PlatoDesactivarComponent', () => {
  let component: PlatoDesactivarComponent;
  let fixture: ComponentFixture<PlatoDesactivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatoDesactivarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoDesactivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
