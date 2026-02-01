import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Concert } from './components/concert/concert';
import { Histoire } from './components/histoire/histoire';
import { Membres } from './components/membres/membres';
import { Galerie } from './components/galerie/galerie';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'contact', component: Contact },
    { path: 'concert', component: Concert },  
    { path: 'groupe/histoire', component: Histoire },
    { path: 'groupe/membres', component: Membres },
    { path: 'galerie', component: Galerie },
];
