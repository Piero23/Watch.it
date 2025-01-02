import { Component } from '@angular/core';
import {CardRicercaComponent} from '../card-ricerca/card-ricerca.component';


@Component({
  selector: 'app-lista-ricerca',
  standalone: true,
  imports: [
    CardRicercaComponent

  ],
  templateUrl: './lista-ricerca.component.html',
  styleUrl: './lista-ricerca.component.css',
  host: {class: "flex-column"}
})
export class ListaRicercaComponent {

}
