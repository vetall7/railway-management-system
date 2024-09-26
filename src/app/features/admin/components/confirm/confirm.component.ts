import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit, OnDestroy {
  @Input() data: number | null = -1;

  @Input() ride: boolean | null = false;

  @Output() changed = new EventEmitter<boolean>();

  @Output() yesDelete = new EventEmitter<boolean>();

  protected visible = true;

  private store = inject(Store);

  private renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  ngOnInit(): void {
    this.bodyClickListener = this.renderer.listen(
      // eslint-disable-next-line no-undef
      document.body,
      'click',
      (event) => {
        if (event.target.classList.contains('confirm')) {
          this.handleClickNo();
        }
      },
    );
  }

  ngOnDestroy() {
    if (this.bodyClickListener) {
      this.bodyClickListener();
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
