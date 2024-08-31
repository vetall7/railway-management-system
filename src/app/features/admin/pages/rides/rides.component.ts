import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
  private store = inject(Store);

  private activeRouter = inject(ActivatedRoute);

  router = inject(Router);

  id = signal<string>(this.activeRouter.snapshot.paramMap.get('id') as string);

  loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  data$ = this.store.select(AdminSelectors.selectGetRide);

  showCreate$ = signal<boolean>(false);

  handleClickBack() {
    this.router.navigate(['admin', 'routes']);
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getRide({ id: Number(this.id()) }));
  }

  handleClickCreate() {
    this.showCreate$.set(true);
  }

  onChangeCancel(el: boolean) {
    this.showCreate$.set(el);
  }

  onChangeCreate(el: boolean) {
    this.showCreate$.set(el);
  }
}
