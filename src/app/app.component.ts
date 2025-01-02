import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SchermataContenutiComponent} from './schermata-contenuti/schermata-contenuti.component';
import {ListaRicercaComponent} from './lista-ricerca/lista-ricerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SchermataContenutiComponent, ListaRicercaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
}
