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
  private readonly store = inject(Store);

  private readonly renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  protected readonly showCreate$ = signal<boolean>(false);

  protected readonly showAlert$ = signal<boolean>(false);

  protected readonly edit$ = signal<IDataFormRouter>({
    data: { id: -1, carriages: [], path: [] },
    update: false,
    checkUpdate: false,
  });

  protected readonly routes$ = this.store.select(AdminSelectors.selectGetRoutes);

  protected readonly loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  public ngOnInit(): void {
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

  protected handleClickCreate(): void {
    this.showCreate$.set(true);
  }

  protected onClickEdit(data: IRoutesData): void {
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

  protected onClickDelete(el: boolean): void {
    this.showCreate$.set(!el);
  }

  protected onCancelEdit(show: boolean): void {
    this.showCreate$.set(show);
  }

  public ngOnDestroy(): void {
    if (this.bodyClickListener) {
      this.bodyClickListener();
    }
  }
}
