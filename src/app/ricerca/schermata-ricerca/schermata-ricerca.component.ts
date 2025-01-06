import { Component } from '@angular/core';
import {ListaRicercaComponent} from '../lista-ricerca/lista-ricerca.component';

@Component({
  selector: 'app-schermata-ricerca',
  standalone: true,
  imports: [
    ListaRicercaComponent
  ],
  templateUrl: './schermata-ricerca.component.html',
  styleUrl: './schermata-ricerca.component.css'
})
export class SchermataRicercaComponent {
  isSerie:boolean = true;
  constructor() { }
}
