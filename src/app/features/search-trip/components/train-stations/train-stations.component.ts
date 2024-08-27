import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-stations.component.html',
  styleUrl: './train-stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainStationsComponent {}
