/* eslint-disable operator-linebreak */
import { Component, DoCheck, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IDataFormStation, IDataPostStation, IUserMark } from '@features/admin/models';
import { latitudeNumberValidator, longitudeNumberValidator } from '@features/admin/validators';
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
    lat: 0,
    lng: 0,
    city: '',
  };

  @Output() changed = new EventEmitter<IUserMark>();

  private readonly formBuilder = inject(FormBuilder);

  private readonly store = inject(Store);

  protected readonly form = this.formBuilder.group({
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
        validators: [Validators.required, latitudeNumberValidator, this.uniqCordValid.bind(this)],
        updateOn: 'blur',
      },
    ],
    longitude: [
      '',
      {
        validators: [Validators.required, longitudeNumberValidator, this.uniqCordValid.bind(this)],
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

  private readonly userMark = signal<IUserMark>({
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  });

  private uniqNameValid(control: AbstractControl): ValidationErrors | null {
    if (!this.dataInput?.map((el) => el.city).includes(control.value.trim())) {
      return null;
    }
    return { uniqNameValid: true };
  }

  private uniqCordValid(): ValidationErrors | null {
    if (
      this.form &&
      !(
        this.dataInput?.map((el) => el.lat).includes(Number(this.form.value.latitude)) &&
        this.dataInput?.map((el) => el.lon).includes(Number(this.form.value.longitude))
      )
    ) {
      return null;
    }
    return { uniqCordValid: true };
  }

  protected getFormsControls(): FormArray {
    return this.form.controls.connected as FormArray;
  }

  protected changeSelect(): void {
    if (!this.form.controls.connected.value.includes('')) {
      (this.form.controls.connected as FormArray).push(
        this.formBuilder.control('', {
          updateOn: 'change',
        }),
      );
    }
  }

  protected changeLatitude(text: string): void {
    this.form.controls.latitude.setValue(text);
    this.userMark.update((val) => ({
      ...val,
      lat: Number(this.form.value.latitude!),
    }));
    this.onChange(this.userMark());
  }

  protected changeLongitude(text: string): void {
    this.form.controls.longitude.setValue(text);
    this.userMark.update((val) => ({
      ...val,
      lng: Number(this.form.value.longitude!),
    }));
    this.onChange(this.userMark());
  }

  public onChange(model: IUserMark): void {
    this.changed.emit(model);
  }

  protected checkSelect(id: number): boolean {
    return this.form.controls.connected.value.includes(String(id));
  }

  protected changeCityName(): void {
    this.userMark.update((val) => ({
      ...val,
      city: this.form.value.cityName!,
    }));
  }

  protected handleSubmit(): void {
    if (this.form.valid) {
      const data: IDataPostStation = {
        city: String(this.form.value.cityName).trim(),
        latitude: Number(this.form.value.latitude),
        longitude: Number(this.form.value.longitude),
        relations: this.form.value.connected!.filter((el) => el !== '').map((el) => Number(el)),
      };
      this.store.dispatch(AdminActions.addStation({ station: data }));
    } else {
      this.form.markAllAsTouched();
    }
  }

  public ngDoCheck(): void {
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
