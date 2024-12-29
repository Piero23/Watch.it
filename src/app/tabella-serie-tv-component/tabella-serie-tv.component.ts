import {booleanAttribute, Component, ViewEncapsulation} from '@angular/core';
import {NgForOf} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tabella-serie-tv',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tabella-serie-tv.component.html',
  styleUrl: './tabella-serie-tv.component.css',
  encapsulation: ViewEncapsulation.None
})

export class TabellaSerieTvComponent {

  count=0;
  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  righe :{anno: number, rating: string, numericalRating: number, nome: string, immagine: string, status: string}[] = [];

  constructor(protected sanitizer: DomSanitizer){}

  addrow() {
    const groupName = `rating${this.count}`;

    const score = window.prompt("voto"); //dummy per testare l'aggiunzione di un voto custom

    const starLayout = `<input value="5" id="\`star${5}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${5}-${groupName}"></label>
               <input value="4" id="\`star${4}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${4}-${groupName}"></label>
               <input value="3" id="\`star${3}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${3}-${groupName}"></label>
               <input value="2" id="\`star${2}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${2}-${groupName}"></label>
               <input value="1" id="\`star${1}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${1}-${groupName}"></label>`;

    let doc = new DOMParser().parseFromString(starLayout, "text/html");

    doc.getElementsByTagName("input")[5 - Number(3)].setAttribute("checked", "checked");

    const riga = {
      anno: 2025,
      rating: doc.body.innerHTML,
      numericalRating: Number(score),
      nome: "godzilla",
      immagine: "assets/images/img.png",
      status: "S3, E5"
    }

    this.righe.push(riga);

    this.count++;
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
      this.righe.sort(function cmp(a,b){
        if (a.anno<b.anno) return 1;
        else return -1;
      })
      this.yearOrder=!this.yearOrder;
    }
    else{
      this.righe.sort(function cmp(a,b){
        if (a.anno>b.anno) return 1;
        else return -1;
      })
      this.yearOrder=!this.yearOrder;
    }
  }

  sortByRating() {
    this.nameOrder=true;
    this.yearOrder=true;

    if (this.ratingOrder){
      this.righe.sort(function cmp(a,b){
        if (a.numericalRating<b.numericalRating) return 1;
        else return -1;
      })
      this.ratingOrder=!this.ratingOrder;
    }
    else{
      this.righe.sort(function cmp(a,b){
        if (a.numericalRating>b.numericalRating) return 1;
        else return -1;
      })
      this.ratingOrder=!this.ratingOrder;
    }
  }
}
