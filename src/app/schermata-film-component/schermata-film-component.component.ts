import { Component } from '@angular/core';

@Component({
  selector: 'app-schermata-film-component',
  standalone: true,
  imports: [],
  templateUrl: './schermata-film-component.component.html',
  styleUrl: './schermata-film-component.component.css'
})
export class SchermataFilmComponentComponent {
  selectedItem: string = "Da Vedere";

  topComment:string = "Top Comment";

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
