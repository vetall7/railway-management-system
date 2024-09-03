import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AdminSelects from '../store/selectors/admin.selector';

export const uniqNameValid: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const store = inject(Store);
  if (!store.select(AdminSelects.selectGetUniqName(control.value))) {
    return null;
  }
  return { uniqNameValid: true };
};
