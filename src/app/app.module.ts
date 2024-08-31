import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchTripModule } from '@features/search-trip/search-trip.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.isProduction,
    }),
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
