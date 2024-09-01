import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-trips',
  templateUrl: './no-trips.component.html',
  styleUrl: './no-trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTripsComponent {}
