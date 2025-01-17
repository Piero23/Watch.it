import {ChangeDetectorRef, Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TMDBDataService} from '../../tmdbdata.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink],
  providers: [TMDBDataService],
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css']
})
export class TabellaFilmComponent {

  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  righe :{anno: number, rating: number, nome: string, immagine: string}[] = [];

  constructor(private tmdb: TMDBDataService) {}

  async addrow() {

    //dao getFilm(Utente)
    const riga: {anno: number, rating: number, nome: string, immagine: string}= {
      anno: 0,
      rating: 0,
      nome: '',
      immagine: ''
    };

    let movie: any = await this.tmdb.getMovieByID(929204);

    riga.anno=movie.release_date.slice(0,4);
    riga.rating=Math.floor(movie.vote_average/2);
    riga.nome=movie.title;
    riga.immagine=movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'URL immagine non disponibile';


    for (let i=0; i<10; i++) this.righe.push(riga);
  }

  sortByName(){
    this.yearOrder=true;
    this.ratingOrder=true;

    if (this.nameOrder){
      this.righe.sort(function cmp(a,b){
        if (a.nome>b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
    else{
      this.righe.sort(function cmp(a,b){
        if (a.nome<b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
  }

  sortByYear() {
    this.nameOrder=true;
    this.ratingOrder=true;

    if (this.yearOrder){
      this.righe.sort((a,b) => b.anno - a.anno)
      this.yearOrder=!this.yearOrder;
    }
    else{
      this.righe.sort((a,b) => a.anno - b.anno)
      this.yearOrder=!this.yearOrder;
    }
  }

  sortByRating() {
    console.log(this.righe);
    this.nameOrder=true;
    this.yearOrder=true;

    if (this.ratingOrder){
      this.righe.sort((a,b) => b.rating - a.rating);
      this.ratingOrder=!this.ratingOrder;
    }
    else{
      this.righe.sort((a,b) => a.rating - b.rating);
      this.ratingOrder=!this.ratingOrder;
    }
  }
}
