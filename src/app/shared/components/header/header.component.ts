/* eslint-disable no-undef */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

import { ProfileService } from '../../../features/profile/services/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
  isLoggedIn = signal(false);

  subscription: Subscription | undefined;

  admin = signal(false);

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn.set(status);
    });
  }

  logout() {
    this.profileService.logout();
    this.authService.logout();
    this.admin.set(false);
  }

  ngDoCheck(): void {
    if (localStorage.getItem('login') === 'admin@admin.com') {
      this.admin.set(true);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
