import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainCarComponent {}
