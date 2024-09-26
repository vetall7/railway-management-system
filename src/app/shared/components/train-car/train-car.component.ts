import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ICarListItem, ICarModalData, IRideCarriageData } from '@features/search-trip/models';
import { TrainCarItemsComponent } from '@shared/components';
import { CarService } from '@shared/services';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [forwardRef(() => TrainCarItemsComponent), NgClass],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainCarComponent implements OnInit {
  @Input() public carriageSeatsData!: ICarListItem;

  @Input() public carriageData!: IRideCarriageData;

  @Input({ required: true }) public allOccupiedSeats!: number[];

  @Output() public selectedEmit = new EventEmitter<ICarModalData>();

  private readonly car = inject(CarService);

  public leftSeats: number[] = [];

  public rightSeats: number[] = [];

  public leftSeatsGroup: number[][] = [];

  public rightSeatsGroup: number[][] = [];

  protected startCarriageIndex = 1;

  public ngOnInit(): void {
    const currentIndexLeft = this.carriageData.leftSeats;
    const currentIndexRight = this.carriageData.rightSeats;

    let leftCount = 0;
    let rightCount = 0;

    this.carriageSeatsData.seats.forEach((seat) => {
      if (leftCount < currentIndexLeft) {
        this.leftSeats.push(seat);
        // eslint-disable-next-line no-plusplus
        leftCount++;
      } else if (rightCount < currentIndexRight) {
        this.rightSeats.push(seat);
        // eslint-disable-next-line no-plusplus
        rightCount++;
      }
      if (leftCount === currentIndexLeft && rightCount === currentIndexRight) {
        leftCount = 0;
        rightCount = 0;
      }
    });

    for (let i = 0; i < this.leftSeats.length; i += currentIndexLeft) {
      this.leftSeatsGroup.push(this.leftSeats.slice(i, i + currentIndexLeft).reverse());
    }
    for (let i = 0; i < this.rightSeats.length; i += currentIndexRight) {
      this.rightSeatsGroup.push(this.rightSeats.slice(i, i + currentIndexRight).reverse());
    }
    // eslint-disable-next-line prefer-destructuring
    this.startCarriageIndex = this.leftSeatsGroup[0][this.leftSeatsGroup[0].length - 1];
  }

  protected getSelectedSeat(seat: number): void {
    this.car.selected = seat;
    this.selectedEmit.emit({
      car: this.carriageSeatsData.numberCar,
      numberSeat: seat,
    });
  }
}
