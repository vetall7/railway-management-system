import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDataRide, IDataRideChange, ISegmentsRide } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-ride-create',
  templateUrl: './ride-create.component.html',
  styleUrl: './ride-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideCreateComponent implements OnInit {
  @Input() data: IDataRide = {
    id: -1,
    path: [],
    carriages: [],
    schedule: [],
  };

  @Output() changed = new EventEmitter<boolean>();

  @Output() createRide = new EventEmitter<boolean>();

  private readonly store = inject(Store);

  private readonly activeRouter = inject(ActivatedRoute);

  private readonly id = signal<string>(this.activeRouter.snapshot.paramMap.get('id') as string);

  protected readonly stationName$ = this.store.select(AdminSelectors.selectGetRideStation);

  private readonly carriagesName$ = this.store.select(AdminSelectors.selectGetRideCarriages);

  protected readonly segment$ = this.store.select(AdminSelectors.selectGetRideCarriages);

  protected readonly create = signal<ISegmentsRide[]>([]);

  protected readonly disabled = signal<boolean>(true);

  protected readonly checkPrice = signal<boolean>(true);

  protected readonly checkTime = signal<boolean>(true);

  public ngOnInit(): void {
    this.create.set(
      new Array(this.data!.path.length - 1).fill({
        time: ['', ''],
        price: { asd: 0 },
      }),
    );
  }

  public onChangeData(data: IDataRideChange): void {
    this.create.update((el) => [
      ...el.slice(0, data.index),
      { time: data.time, price: data.price },
      ...el.slice(data.index + 1),
    ]);

    if (this.checkData()) {
      this.disabled.set(false);
    } else {
      this.disabled.set(true);
    }
  }

  protected handleClickCancel(): void {
    this.changed.emit(false);
  }

  protected checkData(): boolean {
    const a = this.create();
    const correctTime = a
      .map((el) => [new Date(el.time[0]).getTime(), new Date(el.time[1]).getTime()])
      .flat();
    const b = correctTime
      .slice(1)
      .map((el, i) => el - correctTime[i])
      .every((el) => el > 0);
    this.checkTime.set(!b);
    const times = a
      .map((el) => el.time)
      .flat()
      .every((el) => !!el === true);
    const price = a
      .map((el) => Object.values(el.price))
      .flat()
      .every((el) => el > 0);

    this.checkPrice.set(!price);

    return times && price && b;
  }

  protected handleClickCreate(): void {
    if (this.checkData()) {
      this.store.dispatch(
        AdminActions.createRide({
          data: this.create(),
          id: Number(this.id()),
        }),
      );
      this.createRide.emit(false);
    }
  }
}
