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

  @Output() changedDelete = new EventEmitter<boolean>();

  private readonly store = inject(Store);

  private readonly router = inject(Router);

  protected cities$ = new Observable<string | undefined>();

  protected carriages$ = new Observable<string | undefined>();

  protected readonly showConfirm$ = signal<boolean>(false);

  public ngOnInit(): void {
    this.cities$ = this.store.select(AdminSelectors.selectGetStationNameForRoute(this.data!.id));

    this.carriages$ = this.store.select(AdminSelectors.selectGetCarriageForRoute(this.data!.id));
  }

  protected onDeleteNo(show: boolean): void {
    this.showConfirm$.set(show);
  }

  protected onDeleteYes(show: boolean): void {
    this.changedDelete.emit(show);
  }

  protected handleClickDelete(): void {
    this.showConfirm$.set(true);
  }

  protected handleClickEdit(): void {
    if (this.data) {
      this.changed.emit(this.data);
    }
  }

  protected handleClickRide(): void {
    this.router.navigate(['admin', 'routes', this.data?.id]);
  }
}
