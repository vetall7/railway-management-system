import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { IScheduleRide } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.component.html',
  styleUrl: './ride-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideInfoComponent {
  @Input() data: IScheduleRide | null = {
    rideId: -1,
    segments: [],
  };

  private store = inject(Store);

  stationName$ = this.store.select(AdminSelectors.selectGetRideStation);
}
