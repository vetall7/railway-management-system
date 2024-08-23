import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Route } from '@features/search-trip/models/trips.model';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTripComponent {
  public readonly trip = input.required<Route | null>();

  public readonly cityNames = input.required<{ from: string; to: string }>();
}
