import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isValid = date >= today;
    if (!isValid) {
      return { pastDate: 'Date can not be in the past' };
    }
    return null;
  };
}
