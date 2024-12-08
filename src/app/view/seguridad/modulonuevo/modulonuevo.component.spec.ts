import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulonuevoComponent } from './modulonuevo.component';

describe('ModulonuevoComponent', () => {
  let component: ModulonuevoComponent;
  let fixture: ComponentFixture<ModulonuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulonuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulonuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
