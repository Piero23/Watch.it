import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListaRicercaComponent} from './lista-ricerca/lista-ricerca.component';
import {SchermataRicercaComponent} from './schermata-ricerca/schermata-ricerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaRicercaComponent, SchermataRicercaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
}
