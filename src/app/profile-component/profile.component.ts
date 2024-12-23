import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {TabellaFilmComponent} from '../tabella-film-component/tabella-film.component';
import {TabellaSerieTvComponent} from '../tabella-serie-tv-component/tabella-serie-tv.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TabellaFilmComponent,
    TabellaSerieTvComponent,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  showFilm: boolean = true;

}

