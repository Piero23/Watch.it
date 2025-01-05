import {Component, HostBinding, inject, Input} from '@angular/core';
import {literal} from '@angular/compiler';
import {StelleFilmComponent} from '../stelle-film/stelle-film.component';
import {CommentiFilmComponent} from '../commenti-film/commenti-film.component';
import {EpisodiSerieComponent} from '../episodi-serie/episodi-serie.component';
import {ActivatedRoute} from '@angular/router';
import {TMDBDataService} from '../tmdbdata.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';


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
  titolo: string = "";
  isSerie: boolean = true;
  id : number = 0;
  descrizione: string = ""
  posterImage: string = ""
  _bgImage: string = ""

  route : ActivatedRoute = inject(ActivatedRoute)

  getBgImage() {
    return `url("${this._bgImage}")`;
  }

  constructor(private tmdbDataService: TMDBDataService) {
     this.setMovie()
  }

  async setMovie() {
    this.id = this.route.snapshot.params['id'];
    const movie = await this.tmdbDataService.getMovieByID(this.id)
    this.titolo = movie.title
    this.descrizione = movie.overview;
    this.posterImage = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'URL immagine non disponibile';
    this._bgImage = movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : 'URL immagine non disponibile';
  }

  set bgImage(value: string) {
    this._bgImage = value;
  }
}
