import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IDataView } from '@features/admin/models';

@Component({
  selector: 'app-carriage-view',
  templateUrl: './carriage-view.component.html',
  styleUrl: './carriage-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageViewComponent implements OnInit, DoCheck {
  @Input() data: IDataView = { rightSeats: 0, leftSeats: 0, rows: 0 };

  @Output() changed = new EventEmitter<boolean>();

  protected result1: number[] = [];

  protected result2: number[] = [];

  public ngOnInit(): void {
    this.setData();
  }

  protected setData(): void {
    const first = this.data.rightSeats;
    const second = this.data.leftSeats;
    const raw = this.data.rows;
    const start = new Array((first + second) * raw).fill(0).map((el, i) => i + 1);

    const arrFirst = [];
    const arrSecond = [];

    for (let i = 0; i < start.length / 2 + 1; i += 1) {
      arrSecond.push(start.slice(i * first + i * second, i * first + i * second + second));
      arrFirst.push(start.slice(i * first + i * second - first, i * first + i * second));
    }

    this.result1 = this.updateArr(arrFirst, first);

    this.result2 = this.updateArr(arrSecond, second);
  }

  // eslint-disable-next-line class-methods-use-this
  protected updateArr(arr: number[][], num: number): number[] {
    const a = arr.filter((el) => el.length !== 0);
    const c = new Array(num).fill(null);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < a.length; i += 1) {
      for (let b = a[i].length - 1; b >= 0; b -= 1) {
        c[Math.abs(b - num + 1)] ??= [];
        c[Math.abs(b - num + 1)].push(a[i][b]);
      }
    }
    return c.flat();
  }

  public ngDoCheck(): void {
    this.setData();
  }
}
