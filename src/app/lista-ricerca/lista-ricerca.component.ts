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
  risultati : string[][] = [
    ["Grazia Anatomia","1998","76"],
    ["Grazia Anatomia 2","2000","56"],
    ["Grazia Anatomia 3","1995","16"]
  ]

  ricerca : string = "grazia anatomia"

  movies : any = "fa"
  vero : any[] = []

  constructor(private tMDBDataService: TMDBDataService) {
    this.tMDBDataService.getMovies().subscribe(
      (data:any) =>{
        this.movies = data.results
        console.log(this.movies)
      }
    )
    console.log(this.movies)
  }

  protected readonly Number = Number;
}
