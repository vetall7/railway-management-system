import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) {
      return null;
    }

    const isValid = new Date(date) > new Date();
    if (!isValid) {
      return { pastDate: 'Date can not be in the past' };
    }
    return null;
  };
}
