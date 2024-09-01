import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IDataFormRouter, IRoutesData } from '@features/admin/models';
import { RouteFormValid } from '@features/admin/validators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-form-router',
  templateUrl: './form-router.component.html',
  styleUrl: './form-router.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRouterComponent implements OnInit, AfterViewChecked {
  @Input() data: IDataFormRouter | null = {
    data: { id: -1, carriages: [], path: [] },
    update: false,
    checkUpdate: false,
  };

  @Output() changed = new EventEmitter<boolean>();

  formBuilder = inject(FormBuilder);

  store = inject(Store);

  ref = inject(ChangeDetectorRef);

  form = this.formBuilder.group(
    {
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
    },
    { validators: RouteFormValid } as AbstractControlOptions,
  );

  data$ = this.store.select(AdminSelectors.selectGetStations);

  dataUpdate$ = new Observable<IRoutesData | undefined>();

  fillData$ = signal<IRoutesData>({
    id: -1,
    path: [],
    carriages: [],
  });

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

  checkSelectStation(id: number) {
    return this.form.controls.stations.value.includes(String(id));
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
      const data: IRoutesData = {
        id: this.data?.data.id as number,
        carriages: this.form.value.carriages?.slice(0, -1) as string[],
        path: this.form.value.stations
          ?.map((el) => Number(el))
          ?.slice(0, -1) as number[],
      };
      this.store.dispatch(AdminActions.createRouter({ data }));

      this.changed.emit(false);
    }
  }

  handleUpdate() {
    if (this.form.valid) {
      const data: IRoutesData = {
        id: this.data?.data.id as number,
        carriages: this.form.value.carriages?.slice(0, -1) as string[],
        path: this.form.value.stations
          ?.map((el) => Number(el))
          ?.slice(0, -1) as number[],
      };
      this.store.dispatch(AdminActions.updateRouter({ data }));

      this.changed.emit(false);
    }
  }

  updateForm() {
    const car = [...this.fillData$().carriages, ''];
    const st = [...this.fillData$().path.map((el) => String(el)), ''];

    this.form.controls.carriages.reset(car);
    this.form.controls.stations.reset(st);
    this.form.controls.carriages.clear();
    this.form.controls.stations.clear();
    car.forEach((el, i) => {
      if (i < 3) {
        this.form.controls.carriages.push(
          this.formBuilder.control('', {
            validators: [Validators.required],
            updateOn: 'change',
          }),
        );
      } else {
        this.form.controls.carriages.push(
          this.formBuilder.control('', {
            updateOn: 'change',
          }),
        );
      }
    });
    st.forEach((el, i) => {
      if (i < 3) {
        this.form.controls.stations.push(
          this.formBuilder.control('', {
            validators: [Validators.required],
            updateOn: 'change',
          }),
        );
      } else {
        this.form.controls.stations.push(
          this.formBuilder.control('', {
            updateOn: 'change',
          }),
        );
      }
    });

    this.store.dispatch(AdminActions.clearShowData());

    st?.slice(0, -1).forEach((el, i) => {
      this.store.dispatch(
        AdminActions.setShowData({
          id: i + 1,
          valueForm: st as string[],
        }),
      );
    });
    this.form.controls.carriages.reset(car);
    this.form.controls.stations.reset(st);
    this.form.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.setShowData({ id: 0, valueForm: [] }));
  }

  ngAfterViewChecked() {
    if (this.data?.checkUpdate && this.data.update) {
      this.fillData$.set(this.data.data);
      this.updateForm();
      this.data.update = false;
    }
  }

  handleClickCancel() {
    this.changed.emit(false);
  }
}
