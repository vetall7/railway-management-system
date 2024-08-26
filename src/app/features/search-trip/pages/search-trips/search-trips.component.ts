/* eslint-disable no-console */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchAutocompleteService } from '@features/search-trip/services';
import { FetchTripsService } from '@features/search-trip/services/fetch-trips.service';
import { dateValidator } from '@features/search-trip/validators/date-validator.directive';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTripsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  private readonly autoCompleteService = inject(SearchAutocompleteService);

  protected readonly fetchTripsService = inject(FetchTripsService);

  protected isSubmitted = false;

  protected readonly form = this.formBuilder.group({
    from: ['city1', Validators.required],
    to: ['city56', Validators.required],
    date: [new Date(), [Validators.required, dateValidator()]],
    time: new Date(),
  });

  protected filteredCities: string[] = [];

  public ngOnInit(): void {
    this.autoCompleteService.fetchCities();
  }

  protected onSubmit(): void {
    this.isSubmitted = true;
    const { from, to, date, time } = this.form.value;
    if (from && to && date) {
      const cityFrom = this.autoCompleteService.getCityByName(from);
      const cityTo = this.autoCompleteService.getCityByName(to);

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
    this.filteredCities = this.autoCompleteService.getCitiesNames();
    this.filteredCities = this.filteredCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase()),
    );
  }

  public getFilteredCities(): string[] {
    return this.filteredCities;
  }

  protected swapCities(): void {
    const { from, to } = this.form.value;
    if (from && to) {
      this.form.get('from')?.setValue(to);
      this.form.get('to')?.setValue(from);
    }
  }
}
