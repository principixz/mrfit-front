import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenNuevoComponent } from './almacen-nuevo.component';

describe('AlmacenNuevoComponent', () => {
  let component: AlmacenNuevoComponent;
  let fixture: ComponentFixture<AlmacenNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
