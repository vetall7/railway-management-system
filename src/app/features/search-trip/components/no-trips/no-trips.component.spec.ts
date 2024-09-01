import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTripsComponent } from './no-trips.component';

describe('NoTripsComponent', () => {
  let component: NoTripsComponent;
  let fixture: ComponentFixture<NoTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTripsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
