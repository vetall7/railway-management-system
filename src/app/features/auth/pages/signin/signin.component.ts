import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthError, AuthRes } from '@features/auth/models/auth.model';
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
  loginForm: FormGroup;

  authResponse$: Observable<AuthRes | null>;

  authError$: Observable<AuthError | null>;

  authLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.authResponse$ = this.store.select(AuthSelectors.selectAuthResponse);
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
    this.authLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.store.dispatch(AuthActions.signIn({ payload: { email, password } }));

      combineLatest([this.authError$, this.authResponse$]).subscribe(
        ([error, response]) => {
          if (error?.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            });
          } else if (response) {
            this.router.navigate(['/']);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login successful. Welcome!',
            });
          }
        },
      );
    }
  }
}
