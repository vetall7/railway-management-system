import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-form-router',
  templateUrl: './form-router.component.html',
  styleUrl: './form-router.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRouterComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  store = inject(Store);

  form = this.formBuilder.group({
    stations: this.formBuilder.array([
      this.formBuilder.control('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    ]),
    carriages: this.formBuilder.array([
      this.formBuilder.control('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    ]),
  });

  data$ = this.store.select(AdminSelectors.selectGetStations);

  dataCarriages$ = this.store.select(AdminSelectors.selectGetCarriagesData);

  showData$ = this.store.select(AdminSelectors.selectGetShowData);

  getFormsControlsStation(): FormArray {
    return this.form.controls.stations as FormArray;
  }

  getFormsControlsCarriages(): FormArray {
    return this.form.controls.carriages as FormArray;
  }

  changeSelectCarriages() {
    if (!this.form.controls.carriages.value.includes('')) {
      (this.form.controls.carriages as FormArray).push(
        this.formBuilder.control('', {
          updateOn: 'change',
        }),
      );
    }
  }

  changeSelectStation(index: number) {
    if (!this.form.controls.stations.value.includes('')) {
      (this.form.controls.stations as FormArray).push(
        this.formBuilder.control('', {
          updateOn: 'change',
        }),
      );
    }
    if (this.form.controls.stations.value.length - 2 !== index) {
      const station = this.form.value.stations;
      const value = [
        ...(this.form.value.stations?.slice(0, index + 1) as []),
        '',
      ];
      this.form.controls.stations.reset(value);
      for (let i = 0; i < station!.length - value.length; i += 1) {
        this.form.controls.stations.removeAt(value.length);
      }
      this.store.dispatch(AdminActions.updateShowData({ id: index + 1 }));
    }
    this.store.dispatch(
      AdminActions.setShowData({
        id: index + 1,
        valueForm: this.form.value.stations as string[],
      }),
    );
  }

  checkSelect(id: string) {
    return this.form.controls.carriages.value.includes(String(id));
  }

  changeDelete(id: number) {
    const a = [
      ...(this.form.value.carriages?.filter((el, i) => i !== id) as []),
      '',
    ];
    (this.form.controls.carriages as FormArray).reset(a);
    (this.form.controls.carriages as FormArray).removeAt(a.length - 1);
  }

  handleSubmit() {
    if (this.form.valid) {
      // console.log(1);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.setShowData({ id: 0, valueForm: [] }));
  }
}
