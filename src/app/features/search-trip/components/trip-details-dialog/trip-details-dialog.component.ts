import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { SingleTrip } from '@features/search-trip/models';

@Component({
  selector: 'app-trip-details-dialog',
  templateUrl: './trip-details-dialog.component.html',
  styleUrl: './trip-details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsDialogComponent implements OnInit {
  public readonly trip = input.required<SingleTrip | null>();

  protected isVisibleDialog = false;

  private passedCities: string[] = [];

  public ngOnInit(): void {
    const trip = this.trip();
    if (trip) {
      const startIndex = trip.path.findIndex(
        (station) => station.stationId === trip.from.stationId,
      );
      const endIndex = trip.path.findIndex(
        (station) => station.stationId === trip.to.stationId,
      );

      this.passedCities = trip.path
        .slice(startIndex, endIndex + 1)
        .map((station) => station.city);
    }
  }

  protected isPassedCity(city: string): boolean {
    return this.passedCities.includes(city);
  }

  protected openDialog(): void {
    this.isVisibleDialog = true;
  }

  protected closeDialog(): void {
    this.isVisibleDialog = false;
  }

  protected getIsDialogVisible(): boolean {
    return this.isVisibleDialog;
  }
}
