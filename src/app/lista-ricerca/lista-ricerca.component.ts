import {Component, inject, OnInit} from '@angular/core';
import {CardRicercaComponent} from '../card-ricerca/card-ricerca.component';
import {RouterLink} from '@angular/router';
import {TMDBDataService} from '../tmdbdata.service';
import {NgForOf} from '@angular/common';




@Component({
  selector: 'app-lista-ricerca',
  standalone: true,
  imports: [
    CardRicercaComponent,
    RouterLink,
    NgForOf,
  ],
  templateUrl: './lista-ricerca.component.html',
  styleUrl: './lista-ricerca.component.css',
  host: {class: "flex-column"}
})
export class ListaRicercaComponent{

  ricerca : string = "grazia anatomia"
  movies : any[] = []
  vero : any[] = []

  constructor(private tMDBDataService: TMDBDataService) {
    this.tMDBDataService.searchMovies("Gladiator").subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.movies = data;
        } else if (data.results && Array.isArray(data.results)) {
          this.movies = data.results;
        } else {
          this.movies = [data];
        }
      },
      (error) => {
        console.error('Errore nella chiamata API:', error);
      }
    );
  }
}
