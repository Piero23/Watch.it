import {Component, HostListener, Input, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-card-ricerca',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle
  ],
  templateUrl: './card-ricerca.component.html',
  styleUrl: './card-ricerca.component.css',
  host: {class: "rounded-4"}
})
export class CardRicercaComponent implements OnInit {

  @Input() movieInfo: any;

  titolo: string = '';
  descrizione: string = '';
  dataRilascio: string = '';
  voto: number = 0;
  image: string = '';
  colorVoto : string = '';
  id: number = 0;

  ngOnInit(): void {
    this.id = this.movieInfo?.id;
    this.titolo = this.movieInfo?.title || 'Titolo non disponibile';
    this.descrizione = this.movieInfo?.overview || 'Descrizione non disponibile';
    this.dataRilascio = this.movieInfo?.release_date || 'Data non disponibile';
    this.voto =  Number((this.movieInfo?.vote_average).toFixed(1)*10) || 0;
    this.colorVoto = this.colorOnVote(this.voto)
    this.image = this.movieInfo?.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`
      : 'URL immagine non disponibile';
  }


  constructor(private router: Router) {
  }
  @HostListener('click')
  onClick() {
    this.router.navigate(["film/", this.id]);
  }



  colorOnVote(voto : number) {

    if (voto < 5)
     return "red";
    else if(voto > 6.9)
      return "#1BD75F";
    else
      return "yellow";
  }
}
