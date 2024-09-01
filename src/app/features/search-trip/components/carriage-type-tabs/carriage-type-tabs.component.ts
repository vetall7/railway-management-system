import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ICarListItem,
  ICarModalData,
  ICarModalDataInfo,
  IRideCarriage,
  IRideCarriageData,
} from '@features/search-trip/models';

@Component({
  selector: 'app-carriage-type-tabs',
  templateUrl: './carriage-type-tabs.component.html',
  styleUrl: './carriage-type-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageTypeTabsComponent {
  @Input({ required: true }) public carriageTypeData!: IRideCarriage[] | null;

  @Input({ required: true }) public carList!: Record<string, ICarListItem[]>;

  @Input({ required: true }) public dataCarriageSeats!: IRideCarriageData[];

  @Input({ required: true }) public allOccupiedSeats!: number[];

  @Output() public modalDataEmit = new EventEmitter<ICarModalDataInfo>();

  public selectedEmit(data: ICarModalData, price: number): void {
    this.modalDataEmit.emit({ ...data, price });
  }
}
