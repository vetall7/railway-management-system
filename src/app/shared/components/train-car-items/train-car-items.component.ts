import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-train-car-items',
  standalone: true,
  imports: [],
  templateUrl: './train-car-items.component.html',
  styleUrl: './train-car-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainCarItemsComponent {}
