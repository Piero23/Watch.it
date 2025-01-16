import { Routes } from '@angular/router';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {CommentSectionComponent} from './commenti-contenuto/comment-section/comment-section.component';
import {SchermataCommentiComponent} from './commenti-contenuto/schermata-commenti/schermata-commenti.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HomepageBaseComponent} from './homepage/homepage-base/homepage-base.component'; // Importa il componente

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
  },
  {
    path:"login",
    component: LoginRegisterComponent,
    title: "login",
  },
  {
    path:":contenuto/:id/comments",
    component: SchermataCommentiComponent,
    title: "commenti",
  },
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full'
  },
];

