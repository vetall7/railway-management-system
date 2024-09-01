import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const RouteFormValid: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const carriages = control.get('carriages') as unknown as string[];
  const stations = control.get('stations') as unknown as string[];
  if (carriages.length < 4 || stations.length < 4) {
    return {
      routeFormValid: true,
    };
  }
  return null;
};
