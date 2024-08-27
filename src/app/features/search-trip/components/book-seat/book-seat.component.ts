import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrl: './book-seat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSeatComponent {}
