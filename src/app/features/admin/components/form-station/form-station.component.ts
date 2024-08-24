import {
  Component,
  DoCheck,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IDataFormStation, IUserMark } from '@features/admin/models';
import {
  latitudeNumberValidator,
  longitudeNumberValidator,
} from '@features/admin/validators';

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

  form = this.formBuilder.group({
    cityName: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur',
      },
    ],
    latitude: [
      '',
      {
        validators: [Validators.required, latitudeNumberValidator],
        updateOn: 'blur',
      },
    ],
    longitude: [
      '',
      {
        validators: [Validators.required, longitudeNumberValidator],
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
      /* console.log(1); */
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngDoCheck() {
    if (this.userMarkInput.show) {
      this.form.controls.latitude.setValue(String(this.userMarkInput.lat));
      this.form.controls.longitude.setValue(String(this.userMarkInput.lng));
    }
    this.userMark.update((val) => ({
      ...val,
      lat: this.userMarkInput.lat,
      lng: this.userMarkInput.lng,
      show: this.userMarkInput.show,
    }));
  }
}
