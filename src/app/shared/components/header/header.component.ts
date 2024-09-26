/* eslint-disable no-undef */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { STORAGE } from '@shared/web-storage';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menuCheckbox', { static: false }) menuCheckbox!: ElementRef;

  private readonly storage = inject<Storage>(STORAGE);

  protected readonly isLoggedIn = signal(false);

  private subscription: Subscription | undefined;

  protected readonly admin = signal(false);

  protected readonly isHomeRoute = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  private readonly authService = inject(AuthService);

  private readonly profileService = inject(ProfileService);

  private readonly router = inject(Router);

  private readonly isMenuOpen = signal(false);

  protected get isMenuOpenSig(): boolean {
    return this.isMenuOpen();
  }

  protected toggleOverlay(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  protected closeMenu(): void {
    if (this.menuCheckbox.nativeElement.checked) {
      this.menuCheckbox.nativeElement.checked = false;
      this.toggleOverlay();
    }
  }

  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn.set(status);
      if (this.storage.getItem('login') === 'admin@admin.com') {
        this.admin.set(true);
      }
    });

    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.isHomeRoute.set(this.router.url === '/');
      });
  }

  protected logout(): void {
    this.profileService.logout();
    this.authService.logout();
    this.admin.set(false);
    this.closeMenu();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
