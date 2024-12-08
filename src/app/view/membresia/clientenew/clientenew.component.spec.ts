import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientenewComponent } from './clientenew.component';

describe('ClientenewComponent', () => {
  let component: ClientenewComponent;
  let fixture: ComponentFixture<ClientenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientenewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
