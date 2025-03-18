import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourTabComponent } from './four-tab.component';

describe('FourTabComponent', () => {
  let component: FourTabComponent;
  let fixture: ComponentFixture<FourTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
