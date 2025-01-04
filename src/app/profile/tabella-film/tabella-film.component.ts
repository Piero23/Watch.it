import {ChangeDetectorRef, Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css']
})
export class TabellaFilmComponent {

  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  righe :{anno: number, rating: number, nome: string, immagine: string}[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  addrow() {

    //dao getFilm(Utente)

    const riga={
      anno: 2025,
      rating: 3,
      nome: "godzilla",
      immagine: "assets/images/img.png"
    }

    for (let i=0;i<5; i++) this.righe.push(riga);
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
