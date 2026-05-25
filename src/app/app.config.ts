import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeuix/themes';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#fffe03',
            100: '#fffe03',
            200: '#fffe03',
            300: '#fffe03',
            400: '#fffe03',
            500: '#fffe03',
            600: '{yellow.600}',
            700: '{yellow.700}',
            800: '{yellow.800}',
            900: '{yellow.900}',
            950: '{yellow.950}'
        },
         colorScheme: {
            light: {
                primary: {
                    color: '#fffe03',
                    inverseColor: '#fffe03',
                    hoverColor: '#fffe03',
                    activeColor: '#fffe03'
                },
            },
            dark: {
                primary: {
                    color: '#fffe03',
                    inverseColor: '#fffe03',
                    hoverColor: '{yellow.200}',
                    activeColor: '#fffe03'
                },
            }
        }
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    provideRouter(routes, 
        withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
    })),
    providePrimeNG({
      translation: {
        firstDayOfWeek: 1, // Lundi
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                     'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                          'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        today: 'Aujourd\'hui',
        clear: 'Effacer',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'Sem',
      },
      theme: {
        preset: MyPreset,
    
      }
    }),
    
  ]
};

