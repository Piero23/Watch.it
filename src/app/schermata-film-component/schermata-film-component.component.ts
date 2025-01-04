import {Component, HostBinding, inject, Input, input} from '@angular/core';
import {literal} from '@angular/compiler';
import {StelleFilmComponent} from '../stelle-film/stelle-film.component';
import {CommentiFilmComponent} from '../commenti-film/commenti-film.component';
import {EpisodiSerieComponent} from '../episodi-serie/episodi-serie.component';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-schermata-film-component',
  standalone: true,
  imports: [StelleFilmComponent, CommentiFilmComponent, EpisodiSerieComponent
  ],
  templateUrl: './schermata-film-component.component.html',
  styleUrl: './schermata-film-component.component.css',
  host: {"[style.background-image]": "getBgImage()", class: "d-flex py-4"}
})


export class SchermataFilmComponentComponent {
  titolo: string = "Godzilla";
  isSerie: boolean = true;


  route : ActivatedRoute = inject(ActivatedRoute)
  _bgImage: string = "https://picsum.photos/1080/1080";
   getBgImage() {
    return `url("${this._bgImage}")`;
  }

  constructor() {
     this.titolo = this.route.snapshot.params['titolo'];
  }

  @Input() set bgImage(value: string) {
    this._bgImage = value;
  }
}
