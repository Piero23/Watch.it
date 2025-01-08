
import {ProfileComponent} from './profile/profile.component';
import {Component, inject} from '@angular/core';
import {Router, RouterOutlet,RouterLink} from '@angular/router';
import {BannerInfoContentComponent} from './visualizzaContenuto/banner-info-content/banner-info-content.component';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaEpisodiComponent} from './visualizzaContenuto/SerieTv/lista-episodi/lista-episodi.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerInfoContentComponent, SchermataContenutiComponent, ListaEpisodiComponent, ListaRicercaComponent, FormsModule, ProfileComponent, RouterLink],
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
