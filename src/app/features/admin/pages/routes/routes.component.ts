import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesComponent implements OnInit {
  private store = inject(Store);

  showCreate$ = signal<boolean>(false);

  routes$ = this.store.select(AdminSelectors.selectGetRoutes);

  loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getStations());
  }

  handleClickCreate() {
    this.showCreate$.set(true);
  }
}
