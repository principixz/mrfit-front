import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatablematerialComponent } from './datablematerial.component';

describe('DatablematerialComponent', () => {
  let component: DatablematerialComponent;
  let fixture: ComponentFixture<DatablematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatablematerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatablematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
