import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IDataCarriages, IDataView } from '@features/admin/models';

@Component({
  selector: 'app-carriage-info',
  templateUrl: './carriage-info.component.html',
  styleUrl: './carriage-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageInfoComponent implements OnInit {
  @Input() data: IDataCarriages = {
    code: '',
    name: '',
    rightSeats: 0,
    leftSeats: 0,
    rows: 0,
  };

  @Output() changed = new EventEmitter<string>();

  dataView: IDataView = {
    rightSeats: 0,
    leftSeats: 0,
    rows: 0,
  };

  ngOnInit(): void {
    this.dataView = {
      rightSeats: this.data.rightSeats,
      leftSeats: this.data.leftSeats,
      rows: this.data.rows,
    };
  }

  change() {
    this.changed.emit(this.data.code);
  }
}
