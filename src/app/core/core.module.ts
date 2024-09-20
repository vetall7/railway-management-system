import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalStorageService, STORAGE } from '@shared/web-storage';

import { BackgroundComponent } from './components';

@NgModule({
  declarations: [BackgroundComponent],
  imports: [CommonModule],
  exports: [BackgroundComponent],
  providers: [{ provide: STORAGE, useClass: LocalStorageService }],
})
export class CoreModule {}
