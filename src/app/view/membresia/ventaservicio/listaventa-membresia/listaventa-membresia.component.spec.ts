import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaventaMembresiaComponent } from './listaventa-membresia.component';

describe('ListaventaMembresiaComponent', () => {
  let component: ListaventaMembresiaComponent;
  let fixture: ComponentFixture<ListaventaMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaventaMembresiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaventaMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
