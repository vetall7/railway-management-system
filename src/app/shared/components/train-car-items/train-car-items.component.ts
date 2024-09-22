import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarService } from '@shared/services';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-train-car-items',
  standalone: true,
  imports: [NgClass, Button],
  templateUrl: './train-car-items.component.html',
  styleUrl: './train-car-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainCarItemsComponent implements OnInit {
  @Input() public itemNumber!: number;

  @Input() public allOccupiedSeats!: number[];

  @Input() public seatIndexRelativeToCar!: number;

  public isSelected: WritableSignal<number | null> = signal(null);

  @Output() public selectedSeatEmit = new EventEmitter<number>();

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly car = inject(CarService);

  public addSelectedSeat(seat: number): void {
    this.selectedSeatEmit.emit(seat);
  }

  public isOccupied!: boolean;

  ngOnInit(): void {
    this.isOccupied = this.allOccupiedSeats.includes(this.itemNumber);
    this.car.selected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((selected) => {
      this.isSelected.set(selected);
    });
  }

  public isSelectedValue(allSeats: number[]) {
    return !allSeats.includes(this.itemNumber);
  }
}
