import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tabella-serie-tv',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './tabella-serie-tv.component.html',
  styleUrl: './tabella-serie-tv.component.css'
})

export class TabellaSerieTvComponent {

  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  righe :{anno: number, rating: number, nome: string, immagine: string, status: string}[] = [];

  addrow() {
    const score = window.prompt("voto"); //dummy per testare l'aggiunzione di un voto custom

    const riga = {
      anno: 2025,
      rating: Number(score),
      nome: "godzilla",
      immagine: "assets/images/img.png",
      status: "S3, E5"
    }

    this.righe.push(riga);
  }

  sortByName(){
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
