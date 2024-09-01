import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideInfoContentComponent } from './ride-info-content.component';

describe('RideInfoContentComponent', () => {
  let component: RideInfoContentComponent;
  let fixture: ComponentFixture<RideInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideInfoContentComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RideInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
