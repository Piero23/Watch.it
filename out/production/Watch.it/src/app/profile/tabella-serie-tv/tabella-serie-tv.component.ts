import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SerieTvStatusSelectorComponent} from './serie-tv-status-selector/serie-tv-status-selector.component';
import {BannerEditorComponent} from '../banner-editor/banner-editor.component';
import {TMDBDataService} from '../../tmdbdata.service';

@Component({
  selector: 'app-tabella-serie-tv',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    SerieTvStatusSelectorComponent,
    BannerEditorComponent
  ],
  templateUrl: './tabella-serie-tv.component.html',
  styleUrl: './tabella-serie-tv.component.css'
})

export class TabellaSerieTvComponent {

  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  seriesEditor: boolean=false;
  selectedRow: number=0;

  constructor(private tmdb: TMDBDataService) {
  }


  righe: {
    anno: number,
    rating: number,
    nome: string,
    immagine: string,
    status: {
      stagione: number,
      episodio: number
    }
    stagioni: {
      numeroStagione: number,
      numeroEpisodi: number,
    }[]
  }[] = []

  async addrow() {

    let riga: {
      anno: number ,
        rating: number,
        nome: string,
        immagine: string,
        status: {
          stagione: number,
          episodio: number
      }
      stagioni: {
        numeroStagione: number,
        numeroEpisodi: number
      }[]
    } = {
      anno: 0,
      rating: 0,
      nome: "",
      immagine: "",
      status: {
        stagione: 1,
        episodio: 1
      },
      stagioni: []
    }

    let series: any = await this.tmdb.getTvSeriesByID(93405);

    riga.anno=series.first_air_date.slice(0,4);
    riga.rating=Math.floor(series.vote_average/2);
    riga.nome=series.name;
    riga.immagine=series.poster_path
      ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
      : 'URL immagine non disponibile';
    for (let season=0; season<series.number_of_seasons; season++) {
      let stagione: {
        numeroStagione: number,
        numeroEpisodi: number
      } = {
        numeroStagione: 0,
        numeroEpisodi: 0
      }
      stagione.numeroStagione=season+1;
      stagione.numeroEpisodi=series.seasons.at(season).episode_count;
      riga.stagioni.push(stagione);
    }

    for (let i=0; i<10; i++) this.righe.push(riga);
  }

  sortByName(){
    if (this.nameOrder){
      this.righe.sort(function cmp(a,b){
        if (a.nome>b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
    else{
      this.righe.sort(function cmp(a,b){
        if (a.nome<b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
  }

  sortByYear() {
    this.nameOrder=true;
    this.ratingOrder=true;

    if (this.yearOrder){
      this.righe.sort((a,b) => b.anno - a.anno)
      this.yearOrder=!this.yearOrder;
    }
    else{
      this.righe.sort((a,b) => a.anno - b.anno)
      this.yearOrder=!this.yearOrder;
    }
  }

  sortByRating() {
    this.nameOrder=true;
    this.yearOrder=true;

    if (this.ratingOrder){
      this.righe.sort((a,b) => b.rating - a.rating);
      this.ratingOrder=!this.ratingOrder;
    }
    else{
      this.righe.sort((a,b) => a.rating - b.rating);
      this.ratingOrder=!this.ratingOrder;
    }
  }

  openPopup(index: number): void {
    this.seriesEditor = true;
    this.selectedRow=index;
  }

  confirmPopup(status: {stagione: number, episodio: number}){
    this.seriesEditor = false;
    // @ts-ignore
    this.righe.at(this.selectedRow).status=status;
  }

  closePopup(){
    this.seriesEditor = false;
  }

}
