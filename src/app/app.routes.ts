import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; // Importa il componente
export const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
];
