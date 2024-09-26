import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IDataCarriages, IDataView } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-carriage-info',
  templateUrl: './carriage-info.component.html',
  styleUrl: './carriage-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageInfoComponent implements OnInit, DoCheck {
  @Input() data: IDataCarriages = {
    code: '',
    name: '',
    rightSeats: 0,
    leftSeats: 0,
    rows: 0,
  };

  @Output() changed = new EventEmitter<string>();

  @Output() changedDelete = new EventEmitter<boolean>();

  private readonly messageService = inject(MessageService);

  private readonly store = inject(Store);

  protected dataView: IDataView = {
    rightSeats: 0,
    leftSeats: 0,
    rows: 0,
  };

  protected active$ = new Observable<boolean | undefined>();

  public ngOnInit(): void {
    this.dataView = {
      rightSeats: this.data.rightSeats,
      leftSeats: this.data.leftSeats,
      rows: this.data.rows,
    };

    this.active$ = this.store.select(AdminSelectors.selectCheckCarriages(this.data!.name));
  }

  protected change(): void {
    this.changed.emit(this.data.code);
  }

  public ngDoCheck(): void {
    this.dataView = {
      rightSeats: this.data.rightSeats,
      leftSeats: this.data.leftSeats,
      rows: this.data.rows,
    };
  }

  protected handleClickDelete(): void {
    this.active$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'This carriage is used in a ride',
        });
      } else if (this.data!.name) {
        this.changedDelete.emit(false);
        this.store.dispatch(AdminActions.deleteCarriages({ code: { code: this.data!.code! } }));
      }
    });
  }
}
