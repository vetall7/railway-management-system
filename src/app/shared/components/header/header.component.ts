/* eslint-disable no-undef */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { filter, Subscription } from 'rxjs';

import { ProfileService } from '../../../features/profile/services/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = signal(false);

  subscription: Subscription | undefined;

  admin = signal(false);

  isHomeRoute = signal(false);

  destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn.set(status);
      if (localStorage.getItem('login') === 'admin@admin.com') {
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

  logout() {
    this.profileService.logout();
    this.authService.logout();
    this.admin.set(false);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
