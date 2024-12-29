import { Component } from '@angular/core';
import {SchermataFilmComponentComponent} from '../schermata-film-component/schermata-film-component.component';
import {EpisodiSerieComponent} from '../episodi-serie/episodi-serie.component';

@Component({
  selector: 'app-schermata-contenuti',
  standalone: true,
  imports: [
    SchermataFilmComponentComponent,
    EpisodiSerieComponent
  ],
  templateUrl: './schermata-contenuti.component.html',
  styleUrl: './schermata-contenuti.component.css'
})
export class SchermataContenutiComponent {
  isSerie:boolean = true;

}
