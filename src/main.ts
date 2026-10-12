import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Zmiana z App na AppComponent

bootstrapApplication(AppComponent) // Zmiana z App na AppComponent
  .catch((err) => console.error(err));
