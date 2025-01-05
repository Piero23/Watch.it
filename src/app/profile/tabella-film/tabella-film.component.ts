import {ChangeDetectorRef, Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TMDBDataService} from '../../tmdbdata.service';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf, FormsModule],
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

  addrow() {

    //dao getFilm(Utente)
    const riga: {anno: number, rating: number, nome: string, immagine: string}= {
      anno: 0,
      rating: 0,
      nome: '',
      immagine: ''
    };

    this.tmdb.getMovieByID(929204).subscribe({
      next: (data: any)=> {
        riga.anno=data.release_date.slice(0,4);
        riga.rating=Math.floor(data.vote_average/2);
        riga.nome=data.title;
        riga.immagine=data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : 'URL immagine non disponibile';
      }
    });

    this.righe.push(riga);
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
