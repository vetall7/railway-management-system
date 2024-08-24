/* eslint-disable no-undef */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { IUserMark } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit {
  private store = inject(Store);

  options: google.maps.MapOptions = {
    mapId: 'faab40f8d46a15b8',
    zoom: 4,
  };

  nzLocations$ = this.store.select(AdminSelectors.selectGetStationLocations);

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  data$ = this.store.select(AdminSelectors.selectGetStationData);

  allStation$ = this.store.select(AdminSelectors.selectGetStations);

  userMark = signal<IUserMark>({
    show: false,
    lat: NaN,
    lng: NaN,
    city: '',
  });

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
