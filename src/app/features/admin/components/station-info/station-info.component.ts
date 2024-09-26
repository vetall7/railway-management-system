import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { IDataStation } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';

import * as AdminActions from '../../store/actions/admin.actions';
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

  active$ = new Observable<boolean | undefined>();

  private readonly messageService = inject(MessageService);

  constructor(private store: Store) {}

  ngOnInit(): void {
    const id = this.data?.connectedTo.map((el) => el.id);
    if (id) {
      this.connects$ = this.store.select(AdminSelectors.selectGetStationName(id));
      this.active$ = this.store.select(AdminSelectors.selectCheckRouterActive(this.data!.id));
    }
  }

  handleClickDelete() {
    this.active$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You can not delete this station',
        });
        this.store.dispatch(AdminActions.setAlertState({ isAlert: true }));
      } else if (this.data?.id) {
        this.store.dispatch(AdminActions.deleteStation({ id: this.data?.id }));
      }
    });
  }
}
