import {Component, inject} from '@angular/core';
import {SchermataFilmComponentComponent} from '../schermata-film-component/schermata-film-component.component';
import {EpisodiSerieComponent} from '../episodi-serie/episodi-serie.component';
import {ActivatedRoute} from '@angular/router';

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

  route : ActivatedRoute = inject(ActivatedRoute);

  isSerie:boolean = false;


  constructor() {
    if(this.route.snapshot.params['contenuto'] == "tv"){
      this.isSerie = true
    }
  }
}
