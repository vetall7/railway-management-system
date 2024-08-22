/* eslint-disable no-console */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchAutocompleteService } from '@features/search-trip/services';
import { dateValidator } from '@features/search-trip/validators/date-validator.directive';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTripsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly autoCompleteService = inject(SearchAutocompleteService);

  protected readonly form = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    date: ['', [Validators.required, dateValidator()]],
    time: '',
  });

  protected filteredCities: string[] = [];

  public ngOnInit(): void {
    this.autoCompleteService.fetchCities();
  }

  protected onSubmit(): void {
    const { from } = this.form.value;
    const { to } = this.form.value;
    if (from && to) {
      const cityFrom = this.autoCompleteService.getCityByName(from);
      const cityTo = this.autoCompleteService.getCityByName(to);

      console.log('City from:', cityFrom);
      console.log('City to:', cityTo);
    }
  }

  protected filterCities(event: { query: string }): void {
    const { query } = event;
    this.filteredCities = this.autoCompleteService.getCitiesNames();
    this.filteredCities = this.filteredCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
