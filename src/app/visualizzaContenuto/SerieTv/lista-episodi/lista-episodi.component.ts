import {Component, inject, OnInit} from '@angular/core';
import {CardEpisodioComponent} from '../card-episodio/card-episodio.component';
import {TMDBDataService} from '../../../tmdbdata.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatabaseService} from '../../../database.service';

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
  private database : DatabaseService = inject(DatabaseService);


  async getSeasons(){
    this.id = this.route.snapshot.params['id']
    this.tvSeries = await this.tmdbDataService.getTvSeriesByID(this.id)

    this.seasons = this.tvSeries.seasons;

  }

  onSeasonChange(season: any) {
    this.selectedSeasonNum = season;
    this.getEpisodesForSelectedSeason(season)
  }

  async getEpisodesForSelectedSeason(season: any){
    try {
      this.episodes = await this.tmdbDataService.getTvSeriesSeason(this.id, season)
      this.episodes = this.episodes.episodes;

      this.episodes = this.episodes.map((episode: any) => {
        return {
          ...episode,
          visto: false
        };
      });

      return this.episodes;
    }catch(error){
      this.hasSpecial = 1
      this.selectedSeasonNum = 1
      await this.getEpisodesForSelectedSeason(this.selectedSeasonNum)
    }
  }

  onEpisodeChecked(index: number): void {
    for (let i = 0; i <= index; i++) {
      this.episodes[i].visto = true;
    }
    console.log(this.episodes);
  }

  async ngOnInit()  {
    await this.getSeasons()
    await this.getEpisodesForSelectedSeason(this.selectedSeasonNum)


    let utente = await this.database.utenteBySession()

    if(utente){
      // @ts-ignore
            // @ts-ignore
      const datas = await this.database.getContenutoByUtente(this.utente)

      // @ts-ignore
      for (let data of datas) {
        if (data.is_serie == true && data.id_contenuto == this.id){
          data
          break;
        }
      }
    }

  }
}
