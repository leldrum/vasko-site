import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Concert } from './components/concert/concert';
import { Histoire } from './components/histoire/histoire';
import { Membres } from './components/membres/membres';
import { Galerie } from './components/galerie/galerie';
import { AuthGuardService } from './guards/auth-guard';
import { ReahearsalForm } from './components/form/reahearsal-form/reahearsal-form';
import { ConcertForm } from './components/form/concert-form/concert-form';
import { LoginForm } from './components/form/login-form/login-form';
import { DataModal } from './data-modal/data-modal';
import { MediaForm } from './components/form/media-form/media-form';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'contact', component: Contact },
    { path: 'concert', component: Concert },  
    { path: 'groupe/histoire', component: Histoire },
    { path: 'groupe/membres', component: Membres },
    { path: 'galerie', component: Galerie },
    { path: 'creation/repette', component: ReahearsalForm , canActivate: [AuthGuardService]},
    { path: 'creation/concert', component: ConcertForm , canActivate: [AuthGuardService]},
    { path: 'login', component: LoginForm},
    { path: 'admin', component: DataModal, canActivate: [AuthGuardService]},
    { path: 'creation/media', component: MediaForm , canActivate: [AuthGuardService]},


    

];
