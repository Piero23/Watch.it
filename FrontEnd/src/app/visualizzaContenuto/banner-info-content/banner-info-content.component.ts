import {Component, inject} from '@angular/core';
import {StelleFilmComponent} from '../stelle-film/stelle-film.component';
import {PreviewCommenti} from '../preview-commenti/preview-commenti';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TMDBDataService} from '../../tmdbdata.service';
import {NgForOf} from '@angular/common';
import {DatabaseService} from '../../database.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-banner-info-content',
  standalone: true,
  imports: [StelleFilmComponent, PreviewCommenti, NgForOf, FormsModule, RouterLink],
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
  selezione : number = 0;
  utente: string = ""
  isLogged: boolean = false;


  route : ActivatedRoute = inject(ActivatedRoute)
  database: DatabaseService = inject(DatabaseService);

  getBgImage() {
    return `url("${this._bgImage}")`;
  }

  constructor(private tmdbDataService: TMDBDataService, private routing: Router) {
     this.setMovie()

  }

  async setMovie() {
    this.route.params.subscribe(async () => {
      this.id = this.route.snapshot.params['id'];
      this.isSerie = this.route.snapshot.params['contenuto'];


      console.log(this.id);

      this.movie = this.isSerie == "tv" ? await this.tmdbDataService.getTvSeriesByID(this.id) : await this.tmdbDataService.getMovieByID(this.id)
      const utente = await this.database.utenteBySession()

      // @ts-ignore
      if (utente.status == 200) {
        this.isLogged = true;

        // @ts-ignore
        this.utente = utente.username

        // @ts-ignore
        const datas = await this.database.getContenutoByUtente(this.utente)

        console.log(datas)

        const bol = this.isSerie == "tv";
        // @ts-ignore
        for (let data of datas) {
          if (data.is_serie == bol && data.id_contenuto == this.id) {
            this.inLista = true
            this.selezione = data.status
            break;
          }
        }


      }

      this.titolo = this.isSerie == "tv" ? this.movie.name : this.movie.title
      this.rating = this.movie.vote_average.toFixed(0)/2;
      this.genres = this.movie.genres || []
      this.releaseDate = this.movie?.first_air_date? this.movie?.first_air_date.slice(0,4) :  this.movie?.release_date.slice(0,4);
      this.descrizione = this.movie.overview;
      this.posterImage = this.movie.poster_path ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}` : 'assets/images/PosterImageNotFound.png';
      this._bgImage = this.movie.poster_path ? `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}` : 'assets/images/PosterImageNotFound.png';
    });
  }

  async updateStatus(status: number){
    console.log(this.utente)
    console.log(this.isSerie)
    console.log(this.id)
    console.log(status)
    await this.database.aggiornaStatus(this.utente,this.isSerie,this.id,status)
  }


  addToLista() {
    this.inLista = true;
    this.updateStatus(0)
  }

  async rimuoviLista() {
    this.inLista = false;
    await this.database.deleteContenuto_Utente(this.utente,this.isSerie,this.id)
  }

  searchGenre(id: any) {
    this.routing.navigate([`results/`], { queryParams: { genreId: id } });
  }
}
