import {Component, ViewEncapsulation} from '@angular/core';
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

    this.righe.push({
      anno: 2025,
      rating: `<input value="5" id="\`star${5}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${5}-${groupName}"></label>
               <input value="4" id="\`star${4}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${4}-${groupName}"></label>
               <input value="3" id="\`star${3}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${3}-${groupName}"></label>
               <input value="2" id="\`star${2}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${2}-${groupName}"></label>
               <input value="1" id="\`star${1}-${groupName}" name="\`${groupName}" type="radio">
               <label for="\`star${1}-${groupName}"></label>`,
      nome: "godzilla",
      immagine: "assets/images/img.png"
    });

    this.count++;
  }
}
