import {ProfileComponent} from './profile/profile.component';
import {Component, inject} from '@angular/core';
import {Router, RouterOutlet,RouterLink} from '@angular/router';
import {BannerInfoContentComponent} from './visualizzaContenuto/banner-info-content/banner-info-content.component';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaEpisodiComponent} from './visualizzaContenuto/SerieTv/lista-episodi/lista-episodi.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {FormsModule} from '@angular/forms';
import {CommentItemComponent} from './commenti-contenuto/comment-item/comment-item.component';
import {CommentSectionComponent} from './commenti-contenuto/comment-section/comment-section.component';
import { routes } from './app.routes';
import {HomepageComponent} from './homepage/homepage.component';
import {HomepageFiltersComponent} from './homepage/homepage-filters/homepage-filters.component';
import {NgOptimizedImage} from '@angular/common';
import {LoginComponent} from './login-register/login/login.component';
import { RegisterComponent} from './login-register/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerInfoContentComponent, SchermataContenutiComponent, ListaEpisodiComponent, ListaRicercaComponent, FormsModule, ProfileComponent, RouterLink,RegisterComponent, CommentItemComponent, CommentSectionComponent, RouterOutlet, HomepageComponent, HomepageFiltersComponent, NgOptimizedImage, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
  searchQuery : any

  router : Router = inject(Router)

  onSearch() {
    this.router.navigate(['results'], { queryParams: { searchQuery: this.searchQuery } });
  }
}
