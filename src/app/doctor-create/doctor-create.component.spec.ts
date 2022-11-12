import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreateComponent } from './doctor-create.component';

describe('DoctorCreateComponent', () => {
  let component: DoctorCreateComponent;
  let fixture: ComponentFixture<DoctorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
