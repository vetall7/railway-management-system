import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDataCarriages } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-carriages',
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesComponent implements OnInit {
  private store = inject(Store);

  private formBuilder = inject(FormBuilder);

  data$ = this.store.select(AdminSelectors.selectGetCarriagesData);

  loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  show = signal(false);

  code = signal('');

  updateCarriage = signal(false);

  form = this.formBuilder.group({
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    rows: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    leftSeats: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    rightSeats: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  update = false;

  nameUser = '';

  rowsUser = '';

  leftSeatsUser = '';

  rightSeatsUser = '';

  viewCreate = {
    rows: Number(this.rowsUser),
    leftSeats: Number(this.leftSeatsUser),
    rightSeats: Number(this.rightSeatsUser),
  };

  handleClickCreate() {
    if (this.show()) {
      this.clearForm();
    }
    this.show.update((val) => !val);
    this.updateCarriage.set(false);
  }

  clearForm() {
    this.form.reset({
      name: '',
      leftSeats: '',
      rightSeats: '',
      rows: '',
    });
    this.rowsUser = '';
    this.nameUser = '';
    this.leftSeatsUser = '';
    this.rightSeatsUser = '';
    this.setViewCreateUpdate();
    this.setViewCreate();
  }

  setViewCreate() {
    this.viewCreate = {
      rows: Number(this.form.value.rows),
      leftSeats: Number(this.form.value.leftSeats),
      rightSeats: Number(this.form.value.rightSeats),
    };
  }

  setViewCreateUpdate() {
    this.form.controls.rows.setValue(this.rowsUser);
    this.form.controls.leftSeats.setValue(this.leftSeatsUser);
    this.form.controls.rightSeats.setValue(this.rightSeatsUser);
  }

  changeInput() {
    this.setViewCreate();
  }

  handleSubmit() {
    if (this.form.valid) {
      const res: IDataCarriages = {
        leftSeats: Number(this.form.value.leftSeats),
        name: this.form.value.name || '',
        rightSeats: Number(this.form.value.rightSeats),
        rows: Number(this.form.value.rows),
      };
      if (this.updateCarriage()) {
        this.store.dispatch(
          AdminActions.updateCarriagesData({
            data: res,
            code: { code: this.code() },
          }),
        );
      } else {
        this.store.dispatch(AdminActions.createCarriages({ carriages: res }));
      }
      this.handleClickCreate();
    }
  }

  onChanged(code: string) {
    this.code.set(code);
    this.updateCarriage.set(true);
    this.show.set(true);
    this.data$.pipe(take(1)).subscribe((el) => {
      const data = el.find((val) => val.code === code);
      this.rowsUser = String(data?.rows);
      this.nameUser = String(data?.name);
      this.form.controls.name.setValue(this.nameUser);
      this.leftSeatsUser = String(data?.leftSeats);
      this.rightSeatsUser = String(data?.rightSeats);
      this.setViewCreateUpdate();
      this.setViewCreate();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getCarriages());
  }
}
