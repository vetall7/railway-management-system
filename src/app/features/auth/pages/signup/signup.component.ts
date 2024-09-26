import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '@features/auth/models/auth.model';
import { Store } from '@ngrx/store';
import { passwordMatchValidator } from '@shared/validators';
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
export class SignupComponent {
  private readonly store = inject(Store);

  private readonly router = inject(Router);

  private readonly messageService = inject(MessageService);

  protected isShowingErrors = false;

  protected readonly registerForm: FormGroup = new FormGroup(
    {
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
    },
    { validators: passwordMatchValidator('password', 'repeatPassword') },
  );

  private authError$: Observable<ApiError | null>;

  private authResponse$: Observable<unknown>;

  constructor() {
    this.authError$ = this.store.select(AuthSelectors.selectAuthError);
    this.authResponse$ = this.store.select(AuthSelectors.selectAuthResponse);
  }

  protected onRegister(): void {
    this.isShowingErrors = true;
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;
    this.store.dispatch(AuthActions.signUp({ payload: { email, password } }));

    combineLatest([this.authError$, this.authResponse$]).subscribe(([error, response]) => {
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
    });
  }

  protected isPasswordMatch(pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(this.registerForm.get('password')?.value || '');
  }
}
