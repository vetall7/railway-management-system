import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDataRideChange, IScheduleRide, ISegmentsRide } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.component.html',
  styleUrl: './ride-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideInfoComponent implements OnInit {
  @Input() data: IScheduleRide | null = {
    rideId: -1,
    segments: [],
  };

  private readonly store = inject(Store);

  private readonly activeRouter = inject(ActivatedRoute);

  protected readonly showConfirm = signal<boolean>(false);

  protected readonly id = signal<string>(this.activeRouter.snapshot.paramMap.get('id') as string);

  protected readonly segments = signal<ISegmentsRide[]>([]);

  protected readonly stationName$ = this.store.select(AdminSelectors.selectGetRideStation);

  protected readonly editTime = signal<boolean>(false);

  protected readonly editPrice = signal<boolean>(false);

  public ngOnInit(): void {
    this.segments.set(this.data!.segments);
  }

  protected onChangeData(data: IDataRideChange) {
    this.segments.update((el) => [
      ...el.slice(0, data.index),
      { time: data.time, price: data.price },
      ...el.slice(data.index + 1),
    ]);
    this.store.dispatch(
      AdminActions.updateRideData({
        data: this.segments(),
        rideId: this.data!.rideId,
        id: Number(this.id()),
      }),
    );
  }

  protected handleClickDelete(): void {
    this.showConfirm.set(true);
  }

  protected onChangeDelete(el: boolean): void {
    this.showConfirm.set(el);
  }

  protected onChangeYesDelete(el: boolean): void {
    if (el) {
      this.store.dispatch(
        AdminActions.deleteRide({
          roteId: Number(this.id()),
          rideId: this.data!.rideId,
        }),
      );
    }
  }

  protected onEditTime(el: boolean): void {
    this.editTime.set(el);
  }

  protected onEditPrice(el: boolean): void {
    this.editPrice.set(el);
  }
}
