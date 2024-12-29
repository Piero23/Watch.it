import { Component } from '@angular/core';
import {CardEpisodioComponent} from '../card-episodio/card-episodio.component';

@Component({
  selector: 'app-episodi-serie',
  standalone: true,
  imports: [
    CardEpisodioComponent
  ],
  templateUrl: './episodi-serie.component.html',
  styleUrl: './episodi-serie.component.css',
  host: {class: "flex-column"}
})
export class EpisodiSerieComponent {

}
