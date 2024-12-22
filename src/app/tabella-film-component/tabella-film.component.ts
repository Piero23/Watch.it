import {Component, input, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabellaFilmComponent {
  count=0;

  righe :{anno: number, rating: string, nome: string, immagine: string}[] = [];

  constructor(protected sanitizer: DomSanitizer){}

  addrow() {
    const groupName = `rating${this.count}`;

    const score=window.prompt("voto"); //dummy per testare l'aggiunzione di un voto custom

    const starLayout=`<input value="5" id="\`star${5}-${groupName}" name="\`${groupName}" type="radio">
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

    doc.getElementsByTagName("input")[5-Number(score)].setAttribute("checked", "checked");
    //il problema del reset delle stelline persiste ma comunque funziona, basta salvare lo score nel db e poi pullare da quello

    const riga={
      anno: 2025,
      rating: doc.body.innerHTML,
      nome: "godzilla",
      immagine: "assets/images/img.png"
    }

    this.righe.push(riga);

    this.count++;
  }




}
