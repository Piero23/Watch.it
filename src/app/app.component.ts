import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SchermataFilmComponentComponent} from './schermata-film-component/schermata-film-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SchermataFilmComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WatchedIt';
}
