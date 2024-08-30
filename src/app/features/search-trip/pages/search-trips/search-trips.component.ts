/* eslint-disable no-console */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  FetchStationsService,
  FetchTripsService,
} from '@features/search-trip/services';
import { dateValidator } from '@features/search-trip/validators';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTripsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  private readonly fetchStationsService = inject(FetchStationsService);

  protected readonly fetchTripsService = inject(FetchTripsService);

  protected readonly form = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    date: [new Date(), [Validators.required, dateValidator()]],
    time: new Date(),
  });

  protected filteredCities: string[] = [];

  public ngOnInit(): void {
    this.fetchStationsService.fetchStations();
  }

  protected onSubmit(): void {
    const { from, to, date, time } = this.form.value;
    if (from && to && date) {
      const cityFrom = this.fetchStationsService.getCityByName(from);
      const cityTo = this.fetchStationsService.getCityByName(to);

      const mergedTime = time
        ? date.getTime() + new Date(time).getTime()
        : date.getTime();

      if (cityFrom && cityTo) {
        this.fetchTripsService.fetchTrips(
          cityFrom,
          cityTo,
          mergedTime.toString(),
        );
      }
    }
  }

  protected filterCities(event: { query: string }): void {
    const { query } = event;
    this.filteredCities = this.fetchStationsService.getCitiesNames();
    this.filteredCities = this.filteredCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase()),
    );
  }

  protected swapCities(): void {
    const { from, to } = this.form.value;
    if (from && to) {
      this.form.get('from')?.setValue(to);
      this.form.get('to')?.setValue(from);
    }
  }
}
