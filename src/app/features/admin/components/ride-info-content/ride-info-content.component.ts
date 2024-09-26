/* eslint-disable operator-linebreak */
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  signal,
} from '@angular/core';
import { IDataRideChange, ISegmentsRide } from '@features/admin/models';

@Component({
  selector: 'app-ride-info-content',
  templateUrl: './ride-info-content.component.html',
  styleUrl: './ride-info-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideInfoContentComponent implements OnInit, DoCheck, OnDestroy {
  @Input() index: number | null = -1;

  @Input() name: string | undefined = '';

  @Input() pos: string | undefined = '';

  @Input() segment: ISegmentsRide | undefined = { time: [], price: {} };

  @Input() segmentPrev: ISegmentsRide | undefined = { time: [], price: {} };

  @Input() segmentNext: ISegmentsRide | undefined = { time: [], price: {} };

  @Input() create: boolean | undefined = false;

  @Input() carriagesName: (string | undefined)[] = [];

  @Input() openEditTimeForm = false;

  @Input() openEditPriceForm = false;

  @Output() changed = new EventEmitter<IDataRideChange>();

  @Output() changedCreate = new EventEmitter<IDataRideChange>();

  @Output() openEditTime = new EventEmitter<boolean>();

  @Output() openEditPrice = new EventEmitter<boolean>();

  private readonly renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  protected readonly price = signal<[string, number][]>([]);

  protected readonly editPrice = signal(false);

  protected readonly editTime = signal(false);

  protected readonly timeSend = signal<string[]>([]);

  protected readonly priceSend = signal<[string, number][]>([]);

  protected readonly check = signal<boolean>(false);

  protected readonly alert = signal<boolean>(false);

  protected readonly alertPrice = signal<boolean>(false);

  protected readonly alertText = signal<string>('');

  protected readonly alertTextPrice = signal<string>('');

  protected readonly checkPrevTime = signal<boolean>(true);

  protected readonly checkNextTime = signal<boolean>(true);

  public ngOnInit(): void {
    if (this.create) {
      this.price.set(Object.entries(this.segment || {}).map(([key]) => [key, -1]));
      this.priceSend.set(Object.entries(this.segment || {}).map(([key]) => [key, -1]));
      this.timeSend.set(['', '']);
    } else {
      this.price.set(Object.entries(this.segment?.price || {}));
      this.priceSend.set(Object.entries(this.segment?.price || {}));
      this.timeSend.set(this.segment?.time || []);
    }

    this.bodyClickListener = this.renderer.listen(
      // eslint-disable-next-line no-undef
      document.body,
      'click',
      (event) => {
        if (!event.target.closest('.edit_time') && !event.target.closest('.save_time')) {
          this.alert.set(false);
        }
        if (!event.target.closest('.edit_price') && !event.target.closest('.save_price')) {
          this.alertPrice.set(false);
        }
      },
    );
  }

  protected handleClickEditTime(): void {
    if (!this.openEditTimeForm) {
      this.editTime.set(true);
      this.openEditTime.emit(true);
    } else {
      this.alertText.set('Please close time editing mode.');
      this.alert.set(true);
    }
  }

  protected handleClickEditPrice(): void {
    if (!this.openEditPriceForm) {
      this.editPrice.set(true);
      this.openEditPrice.emit(true);
    } else {
      this.alertTextPrice.set('Please close price editing mode.');
      this.alertPrice.set(true);
    }
  }

  protected handleClickSaveTime(): void {
    if (this.segmentPrev) {
      const a = [...this.segmentPrev.time, ...this.timeSend()].map((el) => new Date(el).getTime());
      const b = a
        .slice(1)
        .map((el, i) => el - a[i])
        .every((el) => el > 0);
      this.checkPrevTime.set(b);
    }
    if (this.segmentNext) {
      const a = [...this.timeSend(), ...this.segmentNext.time].map((el) => new Date(el).getTime());
      const b = a
        .slice(1)
        .map((el, i) => el - a[i])
        .every((el) => el > 0);
      this.checkNextTime.set(b);
    }
    if (this.checkNextTime() && this.checkPrevTime()) {
      this.editTime.set(false);
      const data = {
        index: this.index!,
        time: this.timeSend(),
        price: Object.fromEntries(this.price()),
      };
      this.changed.emit(data);
      this.openEditTime.emit(false);
    } else {
      this.alertText.set(
        'At each station, the departure time must be greater than the arrival time, and the arrival time at each station must be greater than the departure time from the previous station.',
      );
      this.alert.set(true);
    }
  }

  protected handleClickSavePrice(): void {
    const a = this.priceSend()
      .flat()
      .filter((el) => typeof el === 'number')
      .every((el) => el > 0);
    if (a) {
      this.editPrice.set(false);
      const data = {
        index: this.index!,
        time: this.timeSend(),
        price: Object.fromEntries(this.priceSend()),
      };
      this.changed.emit(data);
    } else {
      this.alertTextPrice.set('The price must be greater than 0.');
      this.alertPrice.set(true);
    }
  }

  protected handleChangeTime(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.name === 'arrival') {
      this.timeSend.update(() => [`${target.value}:29.906Z`, `${target.value}:30.906Z`]);
    }
    if (target.name === 'departure') {
      this.timeSend.update(() => [`${target.value}:28.906Z`, `${target.value}:29.906Z`]);
    }
    if (this.create) {
      if (this.pos === 'start') {
        this.timeSend.set([`${target.value}:28.906Z`, `${target.value}:29.906Z`]);
      }
      if (this.pos === 'finish') {
        this.timeSend.set([`${target.value}:29.906Z`, `${target.value}:30.906Z`]);
      }
      const data = {
        index: this.index!,
        time: this.timeSend(),
        price: Object.fromEntries(this.priceSend()),
      };

      this.changedCreate.emit(data);
    }
  }

  protected handleChangePrice(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    this.priceSend.update((el) => [
      ...el.slice(0, index),
      [el[index][0], Number(target.value)],
      ...el.slice(index + 1),
    ]);

    if (this.create) {
      const data = {
        index: this.index!,
        time: this.timeSend(),
        price: Object.fromEntries(this.priceSend()),
      };

      this.changedCreate.emit(data);
    }
  }

  public ngDoCheck(): void {
    if (
      // eslint-disable-next-line operator-linebreak
      Object.values(this.segment?.price || {}).join('') !==
        this.price()
          .map((el) => el[1])
          .flat()
          // eslint-disable-next-line operator-linebreak
          .join('') &&
      !this.create
    ) {
      this.price.set(Object.entries(this.segment?.price || {}));
    }
  }

  public ngOnDestroy(): void {
    if (this.bodyClickListener) {
      this.bodyClickListener();
    }
  }
}
