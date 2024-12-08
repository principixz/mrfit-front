import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrocomprobanteComponent } from './registrocomprobante.component';

describe('RegistrocomprobanteComponent', () => {
  let component: RegistrocomprobanteComponent;
  let fixture: ComponentFixture<RegistrocomprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrocomprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrocomprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
