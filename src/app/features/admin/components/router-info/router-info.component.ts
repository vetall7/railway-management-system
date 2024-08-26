import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-router-info',
  templateUrl: './router-info.component.html',
  styleUrl: './router-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterInfoComponent {}
