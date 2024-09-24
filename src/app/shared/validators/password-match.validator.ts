import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordControlName: string,
  repeatPasswordControlName: string,
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordControlName)?.value;
    const repeatPassword = formGroup.get(repeatPasswordControlName)?.value;

    if (password && repeatPassword && password !== repeatPassword) {
      return { mismatch: true };
    }

    return null;
  };
}
