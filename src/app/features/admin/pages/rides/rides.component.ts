import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RidesComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly activeRouter = inject(ActivatedRoute);

  protected readonly router = inject(Router);

  protected readonly id = signal<string>(this.activeRouter.snapshot.paramMap.get('id') as string);

  protected readonly loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  protected readonly data$ = this.store.select(AdminSelectors.selectGetRide);

  protected readonly showCreate$ = signal<boolean>(false);

  protected handleClickBack(): void {
    this.router.navigate(['admin', 'routes']);
  }

  public ngOnInit(): void {
    this.store.dispatch(AdminActions.getRide({ id: Number(this.id()) }));
  }

  protected handleClickCreate(): void {
    this.showCreate$.set(true);
  }

  protected onChangeCancel(el: boolean): void {
    this.showCreate$.set(el);
  }

  protected onChangeCreate(el: boolean): void {
    this.showCreate$.set(el);
  }
}
