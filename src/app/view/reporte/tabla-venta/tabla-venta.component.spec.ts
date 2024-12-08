import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVentaComponent } from './tabla-venta.component';

describe('TablaVentaComponent', () => {
  let component: TablaVentaComponent;
  let fixture: ComponentFixture<TablaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
