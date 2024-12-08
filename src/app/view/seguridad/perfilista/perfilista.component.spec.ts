import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilistaComponent } from './perfilista.component';

describe('PerfilistaComponent', () => {
  let component: PerfilistaComponent;
  let fixture: ComponentFixture<PerfilistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
