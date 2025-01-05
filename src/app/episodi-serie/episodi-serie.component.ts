import {Component, inject} from '@angular/core';
import {CardEpisodioComponent} from '../card-episodio/card-episodio.component';
import {TMDBDataService} from '../tmdbdata.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-episodi-serie',
  standalone: true,
  imports: [
    CardEpisodioComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './episodi-serie.component.html',
  styleUrl: './episodi-serie.component.css',
  host: {class: "flex-column"}
})
export class EpisodiSerieComponent {
  seasons: any;
  selectedSeasonNum: number = 1;
  episodes : any;
  id: any = 0;
  tvSeries: any ;
  route : ActivatedRoute = inject(ActivatedRoute);

  constructor(private tmdbDataService: TMDBDataService) {
    this.getSeasons()
    this.getEpisodesForSelectedSeason(this.selectedSeasonNum)
  }

  async getSeasons(){
    this.id = this.route.snapshot.params['id']
    this.tvSeries = await this.tmdbDataService.getTvSeriesByID(this.id)
    this.seasons = this.tvSeries.seasons;
  }

  onSeasonChange(season: any) {
    this.selectedSeasonNum = season;
    console.log(this.selectedSeasonNum);
  }

  async getEpisodesForSelectedSeason(season: any){
    this.episodes = await this.tmdbDataService.getTvSeriesSeason(this.id, season)
    this.episodes = this.episodes.episodes;
    console.log(this.episodes)
  }
}
