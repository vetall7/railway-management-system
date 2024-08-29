import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { IRoutesData } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-router-info',
  templateUrl: './router-info.component.html',
  styleUrl: './router-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterInfoComponent implements OnInit {
  @Input() data: IRoutesData | null = {
    id: -1,
    carriages: [''],
    path: [0],
  };

  @Output() changed = new EventEmitter<IRoutesData>();

  store = inject(Store);

  router = inject(Router);

  cities$ = new Observable<string | undefined>();

  carriages$ = new Observable<string | undefined>();

  showConfirm$ = signal<boolean>(false);

  ngOnInit(): void {
    this.cities$ = this.store.select(
      AdminSelectors.selectGetStationNameForRoute(this.data!.id),
    );

    this.carriages$ = this.store.select(
      AdminSelectors.selectGetCarriageForRoute(this.data!.id),
    );
  }

  onDeleteNo(show: boolean) {
    this.showConfirm$.set(show);
  }

  handleClickDelete() {
    this.showConfirm$.set(true);
  }

  handleClickEdit() {
    if (this.data) {
      this.changed.emit(this.data);
    }
  }

  handleClickRide() {
    this.router.navigate(['admin', 'routes', this.data?.id]);
  }
}
