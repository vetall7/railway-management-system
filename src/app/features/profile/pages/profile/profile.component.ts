import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@features/profile/models/user-data.model';
import { ProfileService } from '@features/profile/services/profile.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  userData = new BehaviorSubject<UserData>({ email: '', name: '', role: '' });

  profileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
  ) {
    this.profileService
      .getProfileData()
      .subscribe((data) => this.userData.next(data as UserData));

    this.profileForm = new FormGroup({
      email: new FormControl(this.userData?.value.email, [Validators.email]),
      name: new FormControl(this.userData?.value.name),
      password: new FormControl(''),
    });
  }

  onEmailChange() {
    const payload = {
      email: this.profileForm.get('email')?.value as string,
      name: this.userData?.value.name,
    };

    this.profileService.updateUser(payload).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Email changed successfully to: ${payload.name}`,
      });
      this.userData.next(data as UserData);
    });
  }

  onNameChange() {
    const name = this.profileForm.get('name')?.value as string;
    const payload = {
      email: this.userData?.value.email,
      name,
    };

    this.profileService.updateUser(payload).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Name changed successfully to: ${name}`,
      });
      this.userData.next(data as UserData);
    });
  }

  onPasswordChange() {
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
