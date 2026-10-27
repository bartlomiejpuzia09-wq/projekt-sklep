import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Zmiana z App na AppComponent
import { appConfig } from './app/app.config';
bootstrapApplication(AppComponent, appConfig) // Zmiana z App na AppComponent
  .catch((err) => console.error(err));
