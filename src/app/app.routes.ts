import { Routes } from '@angular/router';
import {SchermataContenutiComponent} from './schermata-contenuti/schermata-contenuti.component';
import {ListaRicercaComponent} from './lista-ricerca/lista-ricerca.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaRicercaComponent,
    title: "ricerca"
  },

  {
    path:"film/:nome",
    component: SchermataContenutiComponent,
    title: "Film",
  }
];
