import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TabellaFilmComponent} from '../tabella-film-component/tabella-film.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TabellaFilmComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

