import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SearchTripModule } from '@features/search-trip/search-trip.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from '@shared/components/header/header.component';
import { apiTokenInterceptor } from '@shared/interceptors/api-token.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// eslint-disable-next-line import/extensions
import { environment } from '../environments/environment';

import { ENVIRONMENT } from './shared/services/environment.service';
import { TripDetailStoreModule } from './store/trip-detail/trip-detail-store.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderComponent,
    ToastModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SearchTripModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.isProduction,
    }),
    CoreModule,
    TripDetailStoreModule,
    SearchTripModule,
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    MessageService,
    provideHttpClient(withInterceptors([apiTokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
