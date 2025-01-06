import { Routes } from '@angular/router';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaRicercaComponent,
    title: "ricerca"
  },

  {
    path:":contenuto/:id",
    component: SchermataContenutiComponent,
    title: "Film",
  }
];
