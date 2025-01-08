import {Component, inject, OnInit} from '@angular/core';
import {CardEpisodioComponent} from '../card-episodio/card-episodio.component';
import {TMDBDataService} from '../../../tmdbdata.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-lista-episodi',
  standalone: true,
  imports: [
    CardEpisodioComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './lista-episodi.component.html',
  styleUrl: './lista-episodi.component.css',
  host: {class: "flex-column"}
})
export class ListaEpisodiComponent implements OnInit{
  seasons: any;
  selectedSeasonNum: number = 0;
  episodes : any;
  id: any = 0;
  tvSeries: any ;
  hasSpecial: number = 0;
  route : ActivatedRoute = inject(ActivatedRoute);


  private tmdbDataService: TMDBDataService = inject(TMDBDataService);


  async getSeasons(){
    this.id = this.route.snapshot.params['id']
    this.tvSeries = await this.tmdbDataService.getTvSeriesByID(this.id)
    console.log(this.tvSeries);
    this.seasons = this.tvSeries.seasons;
    console.log(this.seasons)
  }

  onSeasonChange(season: any) {
    this.selectedSeasonNum = season;
    this.getEpisodesForSelectedSeason(season)
  }

  async getEpisodesForSelectedSeason(season: any){
    try {
      this.episodes = await this.tmdbDataService.getTvSeriesSeason(this.id, season)
      this.episodes = this.episodes.episodes;
      //this.episodes = this.episodes.filter((episode: any) => episode.still_path );

      return this.episodes;
    }catch(error){
      this.hasSpecial = 1
      this.selectedSeasonNum = 1
      this.getEpisodesForSelectedSeason(this.selectedSeasonNum)
    }
  }

  async ngOnInit()  {
    this.getSeasons()
    this.getEpisodesForSelectedSeason(this.selectedSeasonNum)
    console.log("caio")
    console.log(this.episodes)
  }
}
