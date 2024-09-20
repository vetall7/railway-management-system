import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  private isAnimationOn = signal(false);

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/auth/signin' || event.url === '/auth/signup') {
          this.isAnimationOn.set(true);
        } else {
          this.isAnimationOn.set(false);
        }
      });
  }

  protected get isAnimationSig() {
    return this.isAnimationOn;
  }
}
