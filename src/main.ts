import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { startServer } from '@planess/train-a-backend';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';

if (environment.isProduction) {
  enableProdMode();
}

startServer()
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch((err) => console.error(err));
