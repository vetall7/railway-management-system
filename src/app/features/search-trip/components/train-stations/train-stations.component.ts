import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { IRideInformation } from '@features/search-trip/models';
import { SingleTrip } from '@shared/models';

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-stations.component.html',
  styleUrl: './train-stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainStationsComponent implements OnInit {
  @Input({ required: true }) public rideData!: IRideInformation | null;

  public currentTrip: WritableSignal<SingleTrip | null> = signal(null);

  ngOnInit(): void {
    this.currentTrip.set({
      carriages: this.rideData?.carriages ?? [],
      from: {
        city: `city${this.rideData?.firstCity}`,
        stationId: this.rideData?.firstCity ?? 0,
        geolocation: { latitude: 0, longitude: 0 },
      },
      to: {
        city: `city${this.rideData?.secondCity}`,
        stationId: this.rideData?.secondCity ?? 0,
        geolocation: { latitude: 0, longitude: 0 },
      },
      path:
        this.rideData?.path.map((data) => {
          return {
            stationId: data,
            city: `city${data}`,
            geolocation: { latitude: 0, longitude: 0 },
          };
        }) ?? [],
      schedule: {
        rideId: this.rideData?.rideId ?? 0,
        segments: this.rideData?.schedule.segments as [],
      },
    });
  }
}
