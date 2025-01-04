import {Component, Input, input} from '@angular/core';
import {ImageCropperComponent} from 'ngx-image-cropper';
import {NgForOf} from '@angular/common';

import {TabellaSerieTvComponent} from '../tabella-serie-tv.component';

@Component({
  selector: 'app-serie-tv-status-selector',
  standalone: true,
  imports: [
    ImageCropperComponent,
    NgForOf
  ],
  templateUrl: './serie-tv-status-selector.component.html',
  styleUrl: './serie-tv-status-selector.component.css'
})
export class SerieTvStatusSelectorComponent {
  @Input() image!: string;
  @Input() rowIndex!: number;

  currentStatus!: { stagione: number; episodio: number };

  listaStagioni: number[]=[]
  listaEpisodi: number[]=[]

  constructor(protected tabella: TabellaSerieTvComponent) {
    // @ts-ignore
    this.currentStatus = tabella.righe.at(this.rowIndex).status;
    // @ts-ignore
    this.image=tabella.righe.at(this.rowIndex).immagine;
  }


  confirmSelection() {
    this.tabella.confirmPopup(this.currentStatus);
  }

  closePopup() {
    this.tabella.closePopup();
  }
}
