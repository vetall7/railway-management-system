import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { IDataFormRouter, IRoutesData } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  private renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  showCreate$ = signal<boolean>(false);

  showAlert$ = signal<boolean>(false);

  edit$ = signal<IDataFormRouter>({
    data: { id: -1, carriages: [], path: [] },
    update: false,
    checkUpdate: false,
  });

  routes$ = this.store.select(AdminSelectors.selectGetRoutes);

  loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getStations());
    this.bodyClickListener = this.renderer.listen(
      // eslint-disable-next-line no-undef
      document.body,
      'click',
      (event) => {
        if (!event.target.closest('.button_edit')) {
          this.showAlert$.set(false);
        }
      },
    );
  }

  handleClickCreate() {
    this.showCreate$.set(true);
  }

  onClickEdit(data: IRoutesData) {
    if (this.showCreate$()) {
      this.showAlert$.set(true);
    } else {
      this.edit$.set({
        data,
        update: true,
        checkUpdate: true,
      });
      this.showCreate$.set(true);
    }
  }

  onClickDelete(el: boolean) {
    this.showCreate$.set(!el);
  }

  onCancelEdit(show: boolean) {
    this.showCreate$.set(show);
  }

  ngOnDestroy() {
    if (this.bodyClickListener) {
      this.bodyClickListener();
    }
  }
}
