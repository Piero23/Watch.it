import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

import {TabellaSerieTvComponent} from '../tabella-serie-tv.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-serie-tv-status-selector',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './serie-tv-status-selector.component.html',
  styleUrl: './serie-tv-status-selector.component.css'
})
export class SerieTvStatusSelectorComponent {
  rowIndex!: number;
  image!: string;

  currentStatus: {stagione: number, episodio: number};

  listaStagioni: number[] = [];
  listaEpisodi: number[][] = [];


  selectedEpisodes: number[] = this.listaEpisodi[0]

  constructor(private tabella: TabellaSerieTvComponent) {
    this.rowIndex = tabella.selectedRow
    // @ts-ignore
    this.image=tabella.righe.at(this.rowIndex).immagine;

    // @ts-ignore
    const statusOriginale = tabella.righe.at(this.rowIndex).status;

    this.currentStatus = {
      stagione: statusOriginale.stagione,
      episodio: statusOriginale.episodio
    };

    // @ts-ignore
    for (let seasonIndex=1; seasonIndex<=tabella.righe.at(this.rowIndex).stagioni.length; seasonIndex++) {
      this.listaStagioni.push(seasonIndex);
      let episodi: number[]=[]
      // @ts-ignore
      for (let episodeIndex=1; episodeIndex<=tabella.righe.at(this.rowIndex).stagioni.at(seasonIndex-1).numeroEpisodi; episodeIndex++) {
        episodi.push(episodeIndex);
      }
      this.listaEpisodi.push(episodi);
    }

    this.selectedEpisodes = this.listaEpisodi[this.currentStatus.stagione - 1];

  }

  onStagioneChange(stagione: number) {
    this.currentStatus.stagione = stagione;
    this.selectedEpisodes = this.listaEpisodi[this.currentStatus.stagione - 1];
    this.currentStatus.episodio = 1;
  }


  confirmSelection() {
    this.tabella.confirmPopup(this.currentStatus);
  }

  closePopup() {
    this.tabella.closePopup();
  }
}
