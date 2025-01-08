import {Component, HostBinding, inject, Input} from '@angular/core';
import {literal} from '@angular/compiler';
import {StelleFilmComponent} from '../stelle-film/stelle-film.component';
import {PreviewCommenti} from '../preview-commenti/preview-commenti';
import {ListaEpisodiComponent} from '../SerieTv/lista-episodi/lista-episodi.component';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {TMDBDataService} from '../../tmdbdata.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {NgForOf} from '@angular/common';
import {generate} from 'rxjs';


@Component({
  selector: 'app-banner-info-content',
  standalone: true,
  imports: [StelleFilmComponent, PreviewCommenti, NgForOf],
  templateUrl: './banner-info-content.component.html',
  styleUrl: './banner-info-content.component.css',
  host: {"[style.background-image]": "getBgImage()", class: "d-flex py-4"}
})


export class BannerInfoContentComponent {
  titolo: string = "";
  isSerie: any
  id : number = 0;
  descrizione: string = ""
  releaseDate: string = ""
  genres: any
  posterImage: string = ""
  _bgImage: string = ""
  movie : any
  inLista : boolean = false;
  rating : any

  route : ActivatedRoute = inject(ActivatedRoute)

  getBgImage() {
    return `url("${this._bgImage}")`;
  }

  constructor(private tmdbDataService: TMDBDataService, private routing: Router) {
     this.setMovie()
  }

  async setMovie() {
    this.id = this.route.snapshot.params['id'];
    this.isSerie = this.route.snapshot.params['contenuto'];

    this.movie = this.isSerie == "tv" ? await this.tmdbDataService.getTvSeriesByID(this.id) : await this.tmdbDataService.getMovieByID(this.id)
    this.titolo = this.isSerie == "tv" ? this.movie.name : this.movie.title
    this.rating = this.movie.vote_average.toFixed(0)/2;
    this.genres = this.movie.genres || []
    this.releaseDate = this.movie?.first_air_date? this.movie?.first_air_date.slice(0,4) :  this.movie?.release_date.slice(0,4);
    this.descrizione = this.movie.overview;
    this.posterImage = this.movie.poster_path ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}` : 'assets/images/PosterImageNotFound.png';
    this._bgImage = this.movie.poster_path ? `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}` : 'assets/images/PosterImageNotFound.png';
  }


  addToLista() {
    this.inLista = true;
  }

  rimuoviLista() {
    this.inLista = false;
  }

  protected readonly generate = generate;

  searchGenre(id: any) {
    this.routing.navigate([`results/`], { queryParams: { genreId: id } });
  }
}
