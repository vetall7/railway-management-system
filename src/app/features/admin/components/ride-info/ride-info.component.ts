import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IDataRideChange,
  IScheduleRide,
  ISegmentsRide,
} from '@features/admin/models';
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

  private store = inject(Store);

  private activeRouter = inject(ActivatedRoute);

  id = signal<string>(this.activeRouter.snapshot.paramMap.get('id') as string);

  segments = signal<ISegmentsRide[]>([]);

  stationName$ = this.store.select(AdminSelectors.selectGetRideStation);

  ngOnInit(): void {
    this.segments.set(this.data!.segments);
  }

  onChangeData(data: IDataRideChange) {
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
}
