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

  ngOnInit(): void {

      this.titolo = this.movieInfo?.title || 'Titolo non disponibile';
      this.descrizione = this.movieInfo?.overview || 'Descrizione non disponibile';
      this.dataRilascio = this.movieInfo?.release_date || 'Data non disponibile';
      this.voto = this.movieInfo?.vote_average || 0;
      this.image = this.movieInfo?.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`
        : 'URL immagine non disponibile';
    }


  constructor(private router: Router) {
  }
  @HostListener('click')
  onClick() {
    this.router.navigate(["film/", this.titolo]);
  }

  tranformVoto(voto: number):number {
    return Number(Number(voto).toFixed(1))*10;
  }

  colorOnVote(voto : number) {
    console.log(this.movieInfo)

    if (voto < 5)
     return "red";
    else if(voto > 6.9)
      return "#1BD75F";
    else
      return "yellow";
  }
}
