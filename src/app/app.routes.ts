import { Routes } from '@angular/router';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  {
    path: 'results',
    component: ListaRicercaComponent,
    title: "ricerca"
  },

  {
    path:":contenuto/:id",
    component: SchermataContenutiComponent,
    title: "Film",
  },
  {
    path: "profile",
    component: ProfileComponent
  }
];
