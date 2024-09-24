import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private readonly sideBarVisible = signal(false);

  private readonly router = inject(Router);

  protected get sideBarVisibleSig(): boolean {
    return this.sideBarVisible();
  }

  protected set sideBarVisibleSig(value: boolean) {
    this.sideBarVisible.set(value);
  }

  protected toggleSideBar(): void {
    this.sideBarVisible.set(!this.sideBarVisible());
  }
}
