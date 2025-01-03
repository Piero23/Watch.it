import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SchermataFilmComponentComponent} from './schermata-film-component/schermata-film-component.component';
import {SchermataContenutiComponent} from './schermata-contenuti/schermata-contenuti.component';
import {EpisodiSerieComponent} from './episodi-serie/episodi-serie.component';
import {ListaRicercaComponent} from './lista-ricerca/lista-ricerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SchermataFilmComponentComponent, SchermataContenutiComponent, EpisodiSerieComponent, ListaRicercaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
}
