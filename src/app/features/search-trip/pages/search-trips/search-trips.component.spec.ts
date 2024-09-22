import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTripsComponent } from './search-trips.component';

describe('SearchTripsComponent', () => {
  let component: SearchTripsComponent;
  let fixture: ComponentFixture<SearchTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
