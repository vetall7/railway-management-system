import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageInfoComponent } from './carriage-info.component';

describe('CarriageInfoComponent', () => {
  let component: CarriageInfoComponent;
  let fixture: ComponentFixture<CarriageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageInfoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarriageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
