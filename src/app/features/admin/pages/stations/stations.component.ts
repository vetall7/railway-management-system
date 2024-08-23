/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import {
  latitudeNumberValidator,
  longitudeNumberValidator,
} from '@features/admin/validators';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent {
  options: google.maps.MapOptions = {
    mapId: 'faab40f8d46a15b8',
    zoom: 4,
  };

  nzLocations: { lat: number; lng: number; city: string }[] = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

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

  data: {
    id: number;
    city: string;
    connectedTo: { id: number; distance: number }[];
    show: boolean;
  }[] = [];

  userMark = {
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  };

  latitudeUser = NaN;

  longitudeUser = NaN;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {
    this.formBuilder = new FormBuilder();
    this.http.get('/api/station').subscribe({
      next: (data) => {
        this.nzLocations = (
          data as {
            city: string;
            id: number;
            latitude: number;
            longitude: number;
          }[]
        ).map((el) => ({ lat: el.latitude, lng: el.longitude, city: el.city }));
        this.data = (
          data as {
            city: string;
            id: number;
            connectedTo: { id: number; distance: number }[];
          }[]
        ).map((el) => ({
          id: el.id,
          city: el.city,
          connectedTo: el.connectedTo,
          show: false,
        }));
      },
      error: (error) => {
        throw new Error(error);
      },
    });
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

  changeLatitude() {
    this.userMark = {
      ...this.userMark,
      lat: Number(this.form.value.latitude!),
    };
    this.cd.detectChanges();
  }

  changeLongitude() {
    this.userMark = {
      ...this.userMark,
      lng: Number(this.form.value.longitude!),
    };
    this.cd.detectChanges();
  }

  checkSelect(id: number) {
    return this.form.controls.connected.value.includes(String(id));
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      marker.advancedMarker.title,
    );
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.userMark = {
      show: true,
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
      city: this.form.value.cityName!,
    };
    this.latitudeUser = event.latLng!.lat();
    this.longitudeUser = event.latLng!.lng();
  }

  changeCityName() {
    this.userMark = {
      ...this.userMark,
      city: this.form.value.cityName!,
    };

    this.infoWindow.close();
  }

  handleSubmit() {
    if (this.form.valid) {
      // console.log(1);
    }
  }
}
