import {Component, inject} from '@angular/core';
import {BannerInfoContentComponent} from '../banner-info-content/banner-info-content.component';
import {ListaEpisodiComponent} from '../SerieTv/lista-episodi/lista-episodi.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schermata-contenuti',
  standalone: true,
  imports: [
    BannerInfoContentComponent,
    ListaEpisodiComponent
  ],
  templateUrl: './schermata-contenuti.component.html',
  styleUrl: './schermata-contenuti.component.css'
})
export class SchermataContenutiComponent {

  route : ActivatedRoute = inject(ActivatedRoute);

  isSerie:boolean = false;


  constructor() {
    if(this.route.snapshot.params['contenuto'] == "tv"){
      this.isSerie = true
    }
  }
}
