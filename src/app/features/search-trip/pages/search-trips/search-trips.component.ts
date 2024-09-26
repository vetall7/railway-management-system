/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, inject, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FetchTripsService } from '@features/search-trip/services';
import { dateValidator } from '@features/search-trip/validators';
import { FetchStationsService } from '@shared/services';

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

  protected readonly isNotFound: WritableSignal<boolean> = this.fetchTripsService.isNotFoundSig;

  protected readonly isLoading: WritableSignal<boolean> = this.fetchTripsService.isLoadingSig;

  protected readonly isLoadingPage = this.fetchStationsService.isLoadingSig;

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

      const mergedTime = date.setHours(time?.getHours() ?? 0, time?.getMinutes() ?? 0, 0, 0);

      if (cityFrom && cityTo) {
        this.fetchTripsService.fetchTrips(cityFrom, cityTo, (mergedTime / 1000).toString());
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
