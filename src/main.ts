import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';

if (environment.isProduction) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
