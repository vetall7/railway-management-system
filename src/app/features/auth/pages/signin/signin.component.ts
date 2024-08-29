import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthError, AuthRes } from '@features/auth/models/auth.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  constructor(private store: Store) {
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
      this.store.dispatch(
        AuthActions.signIn({ playload: { email, password } }),
      );
    }
  }
}
