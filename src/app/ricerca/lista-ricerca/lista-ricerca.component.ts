import {Component, inject, OnInit} from '@angular/core';
import {CardRicercaComponent} from '../card-ricerca/card-ricerca.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
export class ListaRicercaComponent implements OnInit{

  ricerca : string = ""
  GenreResearchID: any;
  isGenreResearch:boolean = false;
  movies : any

  route : ActivatedRoute = inject(ActivatedRoute)
  tMDBDataService: TMDBDataService = inject(TMDBDataService)

  async find(ricerca : any){
    this.movies= await this.tMDBDataService.searchEverything(ricerca)
    this.movies = this.movies.filter((movie: any) => movie.media_type !== "person");
  }

  async findByGenre(id: any){
    this.movies= await this.tMDBDataService.getFilmsByGenre(id)
  }

  ngOnInit(): void {
    this.isGenreResearch=false;

    this.route.queryParams.subscribe(params => {
      this.ricerca = params['searchQuery'];
      this.GenreResearchID = params['genreId'];

      if(this.GenreResearchID){
        this.isGenreResearch=true;
        this.findByGenre(this.GenreResearchID)
      }else {
        this.find(this.ricerca)
      }
    });
  }
}
