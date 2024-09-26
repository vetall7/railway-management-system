/* eslint-disable no-undef */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
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
export class StationsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  private readonly renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  protected readonly options: google.maps.MapOptions = {
    mapId: 'faab40f8d46a15b8',
    zoom: 4,
  };

  protected readonly nzLocations$ = this.store.select(AdminSelectors.selectGetStationLocations);

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  protected readonly data$ = this.store.select(AdminSelectors.selectGetStationData);

  protected readonly allStation$ = this.store.select(AdminSelectors.selectGetStations);

  protected readonly loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  protected readonly alert$ = this.store.select(AdminSelectors.selectGetIsAlert);

  protected readonly userMark = signal<IUserMark>({
    show: false,
    lat: 0,
    lng: 0,
    city: '',
  });

  public ngOnInit(): void {
    this.store.dispatch(AdminActions.getStations());
    this.bodyClickListener = this.renderer.listen(document.body, 'click', (event) => {
      if (!event.target.classList.contains('trash')) {
        this.store.dispatch(AdminActions.setAlertState({ isAlert: false }));
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.bodyClickListener) {
      this.bodyClickListener();
    }
  }

  protected onMarkerClick(marker: MapAdvancedMarker): void {
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
  }

  protected moveMap(event: google.maps.MapMouseEvent): void {
    this.userMark.update((val) => ({
      ...val,
      show: true,
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    }));
  }

  protected onChanged(model: IUserMark): void {
    this.userMark.set({
      ...model,
    });
  }
}
