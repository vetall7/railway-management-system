import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '@features/auth/models/auth.model';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';

import * as AuthActions from '../../store/auth.action';
import * as AuthSelectors from '../../store/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  isShowingErrors = false;

  registerForm: FormGroup;

  authError$: Observable<ApiError | null>;

  authLoading$: Observable<boolean>;

  authResponse$: Observable<unknown>;

  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });

    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
    this.authLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.authResponse$ = this.store.select(AuthSelectors.selectAuthResponse);
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
    this.isShowingErrors = true;
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;
    this.store.dispatch(AuthActions.signUp({ payload: { email, password } }));

    combineLatest([this.authError$, this.authResponse$]).subscribe(
      ([error, response]) => {
        if (error?.error.message) {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        } else if (response !== null) {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You can now sign in',
          });

          this.router.navigate(['/auth/signin']);
        }
      },
    );
  }

  protected isPasswordMatch(pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(this.registerForm.get('password')?.value || '');
  }
}
