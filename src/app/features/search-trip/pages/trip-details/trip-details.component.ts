import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import {
  IQuery,
  IRideError,
  IRideInformation,
} from '@features/search-trip/models';

import { TripDetailFacade } from '../../../../store/trip-detail/facades';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsComponent implements OnInit {
  private readonly tokeId: string = 'id';

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly tripDetailFacade = inject(TripDetailFacade);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public from!: number;

  public to!: number;

  public rideData: WritableSignal<IRideInformation | null> = signal(null);

  public rideError: Signal<IRideError> = this.tripDetailFacade.rideError;

  public ngOnInit(): void {
    this.loadRide();
    this.getParam();
    this.getRideData();
  }

  private getParam(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: IQuery | Params) => {
        this.from = +value.from;
        this.to = +value.to;
      });
  }

  private getRideData(): void {
    this.tripDetailFacade.rideData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rideData: IRideInformation) => {
        if (rideData.path?.length) {
          const startIndex = rideData.path.indexOf(this.from);
          const endIndex = rideData.path.indexOf(this.to);
          this.rideData.set({
            ...rideData,
            startDate: rideData.schedule.segments[startIndex].time[0],
            endDate: rideData.schedule.segments[endIndex - 1].time[1],
            firstCity: this.from,
            secondCity: this.to,
          });
        }
      });
  }

  private loadRide(): void {
    const id = this.activatedRoute.snapshot.paramMap.get(this.tokeId);
    this.tripDetailFacade.loadRide(id ?? '');
  }
}
