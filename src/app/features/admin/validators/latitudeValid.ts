import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const latitudeNumberValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (Number(control.value) >= -90 && Number(control.value) <= 90) {
    return null;
  }
  return { latitudeNumberValidator: true };
};
