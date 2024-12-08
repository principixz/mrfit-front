import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacategoriaComponent } from './listacategoria.component';

describe('ListacategoriaComponent', () => {
  let component: ListacategoriaComponent;
  let fixture: ComponentFixture<ListacategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListacategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
