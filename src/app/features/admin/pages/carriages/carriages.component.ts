import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carriages',
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesComponent {}
