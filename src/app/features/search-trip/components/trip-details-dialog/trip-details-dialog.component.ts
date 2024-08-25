import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SingleTrip } from '@features/search-trip/models/trips.model';

@Component({
  selector: 'app-trip-details-dialog',
  templateUrl: './trip-details-dialog.component.html',
  styleUrl: './trip-details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsDialogComponent {
  public readonly trip = input.required<SingleTrip | null>();

  protected isVisibleDialog = false;

  protected openDialog(): void {
    this.isVisibleDialog = true;
  }

  protected closeDialog(): void {
    this.isVisibleDialog = false;
  }
}
