import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError, AuthRes } from '@features/auth/models/auth.model';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';

import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  private readonly store = inject(Store);

  private readonly router = inject(Router);

  private readonly messageService = inject(MessageService);

  protected isShowingErrors = false;

  protected readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
  });

  protected readonly authResponse$: Observable<AuthRes | null>;

  protected readonly authError$: Observable<ApiError | null>;

  protected readonly authLoading$: Observable<boolean>;

  constructor() {
    this.authResponse$ = this.store.select(AuthSelectors.selectAuthResponse);
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
    this.authLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  protected onLogin(): void {
    this.isShowingErrors = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.store.dispatch(AuthActions.signIn({ payload: { email, password } }));

    combineLatest([this.authError$, this.authResponse$]).subscribe(([error, response]) => {
      if (error?.error.message) {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      } else if (response) {
        this.router.navigate(['/']);
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful. Welcome!',
        });
      }
    });
  }
}
