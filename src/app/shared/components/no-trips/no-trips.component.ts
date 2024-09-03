import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-trips',
  templateUrl: './no-trips.component.html',
  styleUrls: ['./no-trips.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTripsComponent {
  @Input() message = 'There is no such trip';
}
