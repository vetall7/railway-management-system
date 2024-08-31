import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carriage-info',
  templateUrl: './carriage-info.component.html',
  styleUrl: './carriage-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageInfoComponent {}
