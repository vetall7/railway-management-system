import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carriage-view',
  templateUrl: './carriage-view.component.html',
  styleUrl: './carriage-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageViewComponent {}
