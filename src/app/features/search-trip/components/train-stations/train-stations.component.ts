import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRideInformation } from '@features/search-trip/models';

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-stations.component.html',
  styleUrl: './train-stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainStationsComponent {
  @Input({ required: true }) public rideData!: IRideInformation | null;
}
