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
  risultati : string[][] = [
    ["Grazia Anatomia","1998","76"],
    ["Grazia Anatomia 2","2000","56"],
    ["Grazia Anatomia 3","1995","16"]
  ]

  ricerca : string = "grazia anatomia"
}
