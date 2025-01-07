import {Component, inject, OnInit} from '@angular/core';
import {CardRicercaComponent} from '../card-ricerca/card-ricerca.component';
import {RouterLink} from '@angular/router';
import {TMDBDataService} from '../../tmdbdata.service';
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
  movies : any

  constructor(private tMDBDataService: TMDBDataService) {
    this.find()
  }

  async find(){
    this.movies= await this.tMDBDataService.getPopularTvSeries()
  }
}
