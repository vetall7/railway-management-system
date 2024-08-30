import {
  ChangeDetectionStrategy,
  Component,
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
export class RideInfoContentComponent implements OnInit {
  @Input() index: number | null = -1;

  @Input() name: string | undefined = '';

  @Input() pos: string | undefined = '';

  @Input() segment: ISegmentsRide | undefined = { time: [], price: {} };

  @Output() changed = new EventEmitter<IDataRideChange>();

  price = signal<[string, number][]>([]);

  editPrice = signal(false);

  editTime = signal(false);

  timeSend = signal<string[]>([]);

  priceSend = signal<[string, number][]>([]);

  ngOnInit(): void {
    this.price.set(Object.entries(this.segment?.price || {}));
    this.priceSend.set(Object.entries(this.segment?.price || {}));
    this.timeSend.set(this.segment?.time || []);
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
  }

  handleChangePrice(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    this.priceSend.update((el) => [
      ...el.slice(0, index),
      [el[index][0], Number(target.value)],
      ...el.slice(index + 1),
    ]);
  }
}
