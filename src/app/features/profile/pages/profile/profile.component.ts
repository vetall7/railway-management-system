import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@features/profile/models/user-data.model';
import { ProfileService } from '@features/profile/services/profile.service';
import { passwordMatchValidator } from '@shared/validators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  private readonly messageService = inject(MessageService);

  private readonly userData = signal({ email: '', name: '', role: '' });

  private readonly isEmailEditable = signal(false);

  private readonly isNameEditable = signal(false);

  protected readonly isPasswordEditable = signal(false);

  protected readonly isLoading = signal(false);

  protected readonly profileForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.email]),
      name: new FormControl(''),
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

  public ngOnInit(): void {
    this.isLoading.set(true);
    this.profileService.getProfileData().subscribe((data) => {
      this.userData.set(data as UserData);
      this.isLoading.set(false);
      this.profileForm.patchValue({
        email: this.userData()?.email,
        name: this.userData()?.name,
      });
    });
  }

  constructor() {
    effect((): void => {
      if (!this.isNameEditableSig) {
        this.profileForm.get('name')?.disable();
      } else {
        this.profileForm.get('name')?.enable();
      }

      if (!this.isEmailEditableSig) {
        this.profileForm.get('email')?.disable();
      } else {
        this.profileForm.get('email')?.enable();
      }
    });
  }

  protected onEmailChange(): void {
    const email = this.profileForm.get('email')?.value;

    if (email === this.userData()?.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email cannot be the same',
      });
      return;
    }

    const payload = {
      email,
      name: this.userData()?.name,
    };

    this.profileService.updateUser(payload).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Email changed successfully to: ${payload.email}`,
      });
      this.userData.set(data as UserData);
    });
    this.onEmailEditable();
  }

  protected onNameChange(): void {
    const name = this.profileForm.get('name')?.value;

    if (name === this.userData()?.name) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Name cannot be the same',
      });
      return;
    }

    if (name === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Name cannot be empty',
      });
      return;
    }

    const payload = {
      email: this.userData()?.email,
      name,
    };

    this.profileService.updateUser(payload).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Name changed successfully to: ${name}`,
      });
      this.userData.set(data as UserData);
    });
    this.onNameEditable();
  }

  protected onPasswordChange(): void {
    const password = this.profileForm.get('password')?.value as string;
    const payload = {
      password,
    };
    this.onPasswordEditable();

    this.profileService.updatePassword(payload).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password changed successfully',
      });
    });
  }

  protected get isEmailEditableSig(): boolean {
    return this.isEmailEditable();
  }

  protected get isNameEditableSig(): boolean {
    return this.isNameEditable();
  }

  protected get isPasswordEditableSig(): boolean {
    return this.isPasswordEditable();
  }

  protected onPasswordEditable(): void {
    this.isPasswordEditable.update((value) => !value);
    if (!this.isPasswordEditable) {
      this.profileForm.get('password')?.reset('');
      this.profileForm.get('repeatPassword')?.reset('');
    }
  }

  protected onEmailEditable(): void {
    this.isEmailEditable.update((value) => !value);
  }

  protected onNameEditable(): void {
    this.isNameEditable.update((value) => !value);
  }

  protected isPasswordMatch(pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(this.profileForm.get('password')?.value || '');
  }
}
