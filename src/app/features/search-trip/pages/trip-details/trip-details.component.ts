import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';

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

  private readonly searchTrip = inject(SearchTripDetailService);

  public from: WritableSignal<number | null> = signal(null);

  public to: WritableSignal<number | null> = signal(null);

  public rideData: Signal<IRideInformation | null> = computed(() => {
    return this.searchTrip.setTrainDates(
      this.tripDetailFacade.rideData(),
      this.from(),
      this.to(),
    );
  });

  public rideError: Signal<IRideError> = this.tripDetailFacade.rideError;

  public ngOnInit(): void {
    this.loadRide();
    this.getParam();
  }

  private getParam(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: IQuery | Params) => {
        this.from?.set(+value.from);
        this.to?.set(+value.to);
      });
  }

  private loadRide(): void {
    const id = this.activatedRoute.snapshot.paramMap.get(this.tokeId);
    this.tripDetailFacade.loadRide(id ?? '');
  }
}
