import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICarModalDataInfo } from '@features/search-trip/models';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrl: './book-seat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSeatComponent {
  @Input() public modalData!: ICarModalDataInfo;

  @Output() public clearSelectedEmit = new EventEmitter<void>();

  public clearSelected() {
    this.clearSelectedEmit.emit();
    this.modalData = {} as ICarModalDataInfo;
  }

  public get isDisable(): boolean {
    return !!this.modalData?.numberSeat;
  }
}
