import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStationComponent } from './form-station.component';

describe('FormStationComponent', () => {
  let component: FormStationComponent;
  let fixture: ComponentFixture<FormStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
