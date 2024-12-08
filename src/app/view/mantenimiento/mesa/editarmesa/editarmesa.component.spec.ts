import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmesaComponent } from './editarmesa.component';

describe('EditarmesaComponent', () => {
  let component: EditarmesaComponent;
  let fixture: ComponentFixture<EditarmesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarmesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
