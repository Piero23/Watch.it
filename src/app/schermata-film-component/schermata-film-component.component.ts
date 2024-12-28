import {Component, HostBinding, Input, input} from '@angular/core';
import {literal} from '@angular/compiler';
import {StelleFilmComponent} from '../stelle-film/stelle-film.component';
import {CommentiFilmComponent} from '../commenti-film/commenti-film.component';


@Component({
  selector: 'app-schermata-film-component',
  standalone: true,
  imports: [StelleFilmComponent, CommentiFilmComponent
  ],
  templateUrl: './schermata-film-component.component.html',
  styleUrl: './schermata-film-component.component.css',
  host: {"[style.background-image]": "getBgImage()", class: "d-flex py-4"}
})
export class SchermataFilmComponentComponent {
  titolo: string = "Godzilla";
  selectedItem: string = "Da Vedere";
  _bgImage: string = "https://picsum.photos/1080/1080";
   getBgImage() {
    return `url("${this._bgImage}")`;
  }

  @Input() set bgImage(value: string) {
    this._bgImage = value;
  }

  topComment:string = "Top Comment";

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
