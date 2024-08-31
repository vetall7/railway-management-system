import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { IDataRideChange, ISegmentsRide } from '@features/admin/models';

@Component({
  selector: 'app-ride-info-content',
  templateUrl: './ride-info-content.component.html',
  styleUrl: './ride-info-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideInfoContentComponent implements OnInit, DoCheck {
  @Input() index: number | null = -1;

  @Input() name: string | undefined = '';

  @Input() pos: string | undefined = '';

  @Input() segment: ISegmentsRide | undefined = { time: [], price: {} };

  @Input() create: boolean | undefined = false;

  @Input() carriagesName: (string | undefined)[] = [];

  @Output() changed = new EventEmitter<IDataRideChange>();

  @Output() changedCreate = new EventEmitter<IDataRideChange>();

  price = signal<[string, number][]>([]);

  editPrice = signal(false);

  editTime = signal(false);

  timeSend = signal<string[]>([]);

  priceSend = signal<[string, number][]>([]);

  check = signal<boolean>(false);

  ngOnInit(): void {
    if (this.create) {
      this.price.set(
        Object.entries(this.segment || {}).map(([key]) => [key, -1]),
      );
      this.priceSend.set(
        Object.entries(this.segment || {}).map(([key]) => [key, -1]),
      );
      this.timeSend.set(['', '']);
    } else {
      this.price.set(Object.entries(this.segment?.price || {}));
      this.priceSend.set(Object.entries(this.segment?.price || {}));
      this.timeSend.set(this.segment?.time || []);
    }
  }

  handleClickEditTime() {
    this.editTime.set(true);
  }

  handleClickEditPrice() {
    this.editPrice.set(true);
  }

  handleClickSaveTime() {
    this.editTime.set(false);
    const data = {
      index: this.index!,
      time: this.timeSend(),
      price: Object.fromEntries(this.price()),
    };
    this.changed.emit(data);
  }

  handleClickSavePrice() {
    this.editPrice.set(false);
    const data = {
      index: this.index!,
      time: this.timeSend(),
      price: Object.fromEntries(this.priceSend()),
    };
    this.changed.emit(data);
  }

  handleChangeTime(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.name === 'arrival') {
      this.timeSend.update((el) => [`${target.value}:29.906Z`, el[1]]);
    }
    if (target.name === 'departure') {
      this.timeSend.update((el) => [el[0], `${target.value}:29.906Z`]);
    }
    if (this.create) {
      if (this.pos === 'start') {
        this.timeSend.set([
          '2024-08-13T01:17:29.906Z',
          `${target.value}:29.906Z`,
        ]);
      }
      if (this.pos === 'finish') {
        this.timeSend.set([
          `${target.value}:29.906Z`,
          '2024-08-13T01:17:29.906Z',
        ]);
      }
      const data = {
        index: this.index!,
        time: this.timeSend(),
        price: Object.fromEntries(this.priceSend()),
      };

      this.changedCreate.emit(data);
    }
  }

  handleChangePrice(event: Event, index: number) {
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

  ngDoCheck(): void {
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
}
