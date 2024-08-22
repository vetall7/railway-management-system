import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchTripModule } from '@features/search-trip/search-trip.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// eslint-disable-next-line import/extensions
import { environment } from '../environments/environment';

import { ENVIRONMENT } from './shared/services/environment.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SearchTripModule,
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
