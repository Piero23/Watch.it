import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {BannerInfoContentComponent} from './visualizzaContenuto/banner-info-content/banner-info-content.component';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaEpisodiComponent} from './visualizzaContenuto/SerieTv/lista-episodi/lista-episodi.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerInfoContentComponent, SchermataContenutiComponent, ListaEpisodiComponent, ListaRicercaComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
  searchQuery : any

  router : Router = inject(Router)

  onSearch() {
    console.log(this.searchQuery);
    this.router.navigate(['results'], { queryParams: { searchQuery: this.searchQuery } });
  }
}
