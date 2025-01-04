import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SerieTvStatusSelectorComponent} from './serie-tv-status-selector/serie-tv-status-selector.component';
import {BannerEditorComponent} from '../banner-editor/banner-editor.component';

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

  righe :{anno: number, rating: number, nome: string, immagine: string, status: {stagione: number, episodio: number}}[] = [];
  seriesEditor: boolean=false;
  currentImage: string="";
  selectedRow: number=0;

  addrow() {

    const riga = {
      anno: 2025,
      rating: 3,
      nome: "godzilla",
      immagine: "assets/images/img.png",
      status: {stagione: 3, episodio: 5}
    }

    for (let i=0;i<5; i++) this.righe.push(riga);
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

  openPopup(image:string, index: number): void {
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
