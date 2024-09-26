import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {
  @Input() data: number | null = -1;

  @Input() ride: boolean | null = false;

  @Output() changed = new EventEmitter<boolean>();

  @Output() yesDelete = new EventEmitter<boolean>();

  private store = inject(Store);

  ngOnInit(): void {
    // eslint-disable-next-line no-alert, no-undef, no-restricted-globals
    if (confirm('Are you sure you want to delete this item?')) {
      this.handleClickYes();
    } else {
      this.handleClickNo();
    }
  }

  handleClickYes() {
    if (this.ride) {
      this.yesDelete.emit(true);
      this.changed.emit(false);
    } else {
      this.store.dispatch(AdminActions.deleteRouter({ id: this.data! }));
      this.yesDelete.emit(true);
      this.handleClickNo();
    }
  }

  handleClickNo() {
    this.changed.emit(false);
  }
}
