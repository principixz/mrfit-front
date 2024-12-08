import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamesaComponent } from './listamesa.component';

describe('ListamesaComponent', () => {
  let component: ListamesaComponent;
  let fixture: ComponentFixture<ListamesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListamesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListamesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
