import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const longitudeNumberValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (Number(control.value) >= -180 && Number(control.value) <= 180) {
    return null;
  }
  return { longitudeNumberValidator: true };
};
