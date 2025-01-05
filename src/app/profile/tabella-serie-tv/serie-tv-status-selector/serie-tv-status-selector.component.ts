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

  numeroStagioni: number[]=[];
  numeroEpisodi: number[]=[];

  constructor(protected tabella: TabellaSerieTvComponent) {
    // @ts-ignore
    this.currentStatus = tabella.righe.at(this.rowIndex).status;
    // @ts-ignore
    this.image=tabella.righe.at(this.rowIndex).immagine;
    // @ts-ignore
    this.numeroEpisodi=Array.from({ length: tabella.righe.at(this.rowIndex).total.episodi }, (_, i) => i + 1);
    // @ts-ignore
    this.numeroStagioni=Array.from({ length: tabella.righe.at(this.rowIndex).total.stagioni }, (_, i) => i + 1);
  }


  confirmSelection() {
    this.tabella.confirmPopup(this.currentStatus);
  }

  closePopup() {
    this.tabella.closePopup();
  }
}
