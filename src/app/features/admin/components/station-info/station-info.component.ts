import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IDataStation } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-station-info',
  templateUrl: './station-info.component.html',
  styleUrl: './station-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationInfoComponent implements OnInit {
  @Input() data: IDataStation | null = {
    id: 0,
    city: '',
    connectedTo: [{ id: 0, distance: 0 }],
    latitude: 0,
    longitude: 0,
  };

  connects$ = new Observable<string | undefined>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    const id = this.data?.connectedTo.map((el) => el.id);
    if (id) {
      this.connects$ = this.store.select(
        AdminSelectors.selectGetStationName(id),
      );
    }
  }
}
