import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaunidadmedidaComponent } from './listaunidadmedida.component';

describe('ListaunidadmedidaComponent', () => {
  let component: ListaunidadmedidaComponent;
  let fixture: ComponentFixture<ListaunidadmedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaunidadmedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaunidadmedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
