import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {environment} from '../environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    importProvidersFrom(AngularFireAuth),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideMessaging(() => getMessaging()),
    // providePerformance(() => getPerformance()),
    // provideStorage(() => getStorage()),
  ]
};
