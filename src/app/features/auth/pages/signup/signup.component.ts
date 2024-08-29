import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  authError$: Observable<unknown>;

  authLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    });

    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
    this.authLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  ngOnInit(): void {
    this.registerForm
      .get('repeatPassword')
      ?.addValidators(this.passwordMatchValidator());
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.registerForm.get('password')?.value;
      const repeatPassword = control.value;

      if (password && repeatPassword && password !== repeatPassword) {
        return { mismatch: true };
      }

      return null;
    };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.store.dispatch(
        AuthActions.signUp({ playload: { email, password } }),
      );
    }
  }
}
