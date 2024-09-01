import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalStorageService, STORAGE } from '@shared/web-storage';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: STORAGE, useClass: LocalStorageService }],
})
export class CoreModule {}
