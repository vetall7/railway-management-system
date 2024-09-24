import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@features/profile/models/user-data.model';
import { ProfileService } from '@features/profile/services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);

  private readonly messageService = inject(MessageService);

  private readonly userData = signal({ email: '', name: '', role: '' });

  protected readonly profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    name: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {
    this.profileService.getProfileData().subscribe((data) => {
      this.userData.set(data as UserData);
      this.profileForm.patchValue({
        email: this.userData()?.email,
        name: this.userData()?.name,
      });
    });
  }

  protected onEmailChange(): void {
    const payload = {
      email: this.profileForm.get('email')?.value as string,
      name: this.userData()?.name,
    };

    this.profileService.updateUser(payload).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Email changed successfully to: ${payload.name}`,
      });
      this.userData.set(data as UserData);
    });
  }

  protected onNameChange(): void {
    const name = this.profileForm.get('name')?.value as string;
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
  }

  protected onPasswordChange(): void {
    const password = this.profileForm.get('password')?.value as string;
    const payload = {
      password,
    };

    this.profileService.updatePassword(payload).subscribe((res) => {
      if (res === '') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password changed successfully',
        });
      }
    });
  }
}
