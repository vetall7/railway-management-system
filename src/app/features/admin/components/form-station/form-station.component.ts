/* eslint-disable operator-linebreak */
import {
  Component,
  DoCheck,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  IDataFormStation,
  IDataPostStation,
  IUserMark,
} from '@features/admin/models';
import {
  latitudeNumberValidator,
  longitudeNumberValidator,
} from '@features/admin/validators';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';

@Component({
  selector: 'app-form-station',
  templateUrl: './form-station.component.html',
  styleUrl: './form-station.component.scss',
})
export class FormStationComponent implements DoCheck {
  @Input() dataInput: IDataFormStation[] | null = [];

  @Input() userMarkInput: IUserMark = {
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  };

  @Output() changed = new EventEmitter<IUserMark>();

  formBuilder = inject(FormBuilder);

  store = inject(Store);

  form = this.formBuilder.group({
    cityName: [
      '',
      {
        validators: [Validators.required, this.uniqNameValid.bind(this)],
        updateOn: 'blur',
      },
    ],
    latitude: [
      '',
      {
        validators: [
          Validators.required,
          latitudeNumberValidator,
          this.uniqCordValid.bind(this),
        ],
        updateOn: 'blur',
      },
    ],
    longitude: [
      '',
      {
        validators: [
          Validators.required,
          longitudeNumberValidator,
          this.uniqCordValid.bind(this),
        ],
        updateOn: 'blur',
      },
    ],
    connected: this.formBuilder.array([
      this.formBuilder.control('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    ]),
  });

  userMark = signal<IUserMark>({
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  });

  uniqNameValid(control: AbstractControl): ValidationErrors | null {
    if (!this.dataInput?.map((el) => el.city).includes(control.value.trim())) {
      return null;
    }
    return { uniqNameValid: true };
  }

  uniqCordValid(): ValidationErrors | null {
    if (
      this.form &&
      !(
        this.dataInput
          ?.map((el) => el.lat)
          .includes(Number(this.form.value.latitude)) &&
        this.dataInput
          ?.map((el) => el.lon)
          .includes(Number(this.form.value.longitude))
      )
    ) {
      return null;
    }
    return { uniqCordValid: true };
  }

  getFormsControls(): FormArray {
    return this.form.controls.connected as FormArray;
  }

  changeSelect() {
    if (!this.form.controls.connected.value.includes('')) {
      (this.form.controls.connected as FormArray).push(
        this.formBuilder.control('', {
          updateOn: 'change',
        }),
      );
    }
  }

  changeLatitude(text: string) {
    this.form.controls.latitude.setValue(text);
    this.userMark.update((val) => ({
      ...val,
      lat: Number(this.form.value.latitude!),
    }));
    this.onChange(this.userMark());
  }

  changeLongitude(text: string) {
    this.form.controls.longitude.setValue(text);
    this.userMark.update((val) => ({
      ...val,
      lng: Number(this.form.value.longitude!),
    }));
    this.onChange(this.userMark());
  }

  onChange(model: IUserMark) {
    this.changed.emit(model);
  }

  checkSelect(id: number) {
    return this.form.controls.connected.value.includes(String(id));
  }

  changeCityName() {
    this.userMark.update((val) => ({
      ...val,
      city: this.form.value.cityName!,
    }));
  }

  handleSubmit() {
    if (this.form.valid) {
      const data: IDataPostStation = {
        city: String(this.form.value.cityName).trim(),
        latitude: Number(this.form.value.latitude),
        longitude: Number(this.form.value.longitude),
        relations: this.form.value
          .connected!.filter((el) => el !== '')
          .map((el) => Number(el)),
      };
      this.store.dispatch(AdminActions.addStation({ station: data }));
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngDoCheck() {
    if (this.userMarkInput.show) {
      this.form.controls.latitude.setValue(String(this.userMarkInput.lat));
      this.form.controls.longitude.setValue(String(this.userMarkInput.lng));
      this.form.controls.longitude.markAsTouched();
      this.form.controls.latitude.markAsTouched();
    }
    this.userMark.update((val) => ({
      ...val,
      lat: this.userMarkInput.lat,
      lng: this.userMarkInput.lng,
      show: this.userMarkInput.show,
    }));
  }
}
