import { Component } from '@angular/core';
import {ListaRicercaComponent} from '../lista-ricerca/lista-ricerca.component';

@Component({
  selector: 'app-schermata-contenuti',
  standalone: true,
  imports: [
    ListaRicercaComponent
  ],
  templateUrl: './schermata-contenuti.component.html',
  styleUrl: './schermata-contenuti.component.css'
})
export class SchermataContenutiComponent {
  isSerie:boolean = true;
  constructor() { }
}
