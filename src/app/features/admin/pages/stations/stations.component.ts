/* eslint-disable no-undef */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import {
  IDataFormStation,
  IDataStation,
  ILocation,
  IUserMark,
} from '@features/admin/models';
import { StationService } from '@features/admin/services/station.service';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit {
  options: google.maps.MapOptions = {
    mapId: 'faab40f8d46a15b8',
    zoom: 4,
  };

  nzLocations: ILocation[] = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  data: IDataFormStation[] = [];

  userMark = signal<IUserMark>({
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  });

  constructor(
    private stationService: StationService,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {
    this.stationService.getStations().subscribe({
      next: (data) => {
        this.nzLocations = (data as IDataStation[]).map((el) => ({
          lat: el.latitude,
          lng: el.longitude,
          city: el.city,
        }));
        this.data = (data as IDataStation[]).map((el) => ({
          id: el.id,
          city: el.city,
          connectedTo: el.connectedTo,
        }));
        this.cd.markForCheck();
      },
      error: (error) => {
        throw new Error(error);
      },
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getStations());
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      marker.advancedMarker.title,
    );
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.userMark.update((val) => ({
      ...val,
      show: true,
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    }));
  }

  onChanged(model: IUserMark) {
    this.userMark.set({
      ...model,
    });
  }
}
