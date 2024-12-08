import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulolistaComponent } from './modulolista.component';

describe('ModulolistaComponent', () => {
  let component: ModulolistaComponent;
  let fixture: ComponentFixture<ModulolistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulolistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
