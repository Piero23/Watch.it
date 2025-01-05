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
  isSerie: any
  id : number = 0;
  descrizione: string = ""
  posterImage: string = ""
  _bgImage: string = ""
  movie : any

  route : ActivatedRoute = inject(ActivatedRoute)

  getBgImage() {
    return `url("${this._bgImage}")`;
  }

  constructor(private tmdbDataService: TMDBDataService) {
     this.setMovie()
  }


  async setMovie() {
    this.id = this.route.snapshot.params['id'];
    this.isSerie = this.route.snapshot.params['contenuto'];
    if(this.isSerie == "tv"){
      this.movie = await this.tmdbDataService.getTvSeriesByID(this.id)
      this.titolo = this.movie.name
    }else {
      this.movie = await this.tmdbDataService.getMovieByID(this.id)
      this.titolo = this.movie.title
    }

    this.descrizione = this.movie.overview;
    this.posterImage = this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      : 'URL immagine non disponibile';
    this._bgImage = this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`
      : 'URL immagine non disponibile';
  }

  set bgImage(value: string) {
    this._bgImage = value;
  }
}
