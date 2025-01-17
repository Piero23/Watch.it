import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-card-ricerca',
  standalone: true,
  imports: [
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
  voto: any = 0;
  image: string = '';
  colorVoto: string = '';
  id: number = 0;
  isSerie = false;

  ngOnInit(): void {

    this.id = this.movieInfo?.id;
    if (this.movieInfo?.title)
      this.titolo = this.movieInfo?.title
    else {
      this.titolo = this.movieInfo?.name
      this.isSerie = true;
    }
    this.descrizione = this.movieInfo?.overview || 'Descrizione non disponibile';
    this.dataRilascio = this.movieInfo?.first_air_date ? this.movieInfo?.first_air_date.slice(0, 4) : this.movieInfo?.release_date.slice(0, 4);
    this.voto = Number((this.movieInfo?.vote_average).toFixed(1) * 10) || -1;
    this.colorVoto = this.colorOnVote(this.voto)
    this.image = this.movieInfo?.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movieInfo.poster_path}`
      : 'assets/images/PosterImageNotFound.png';
  }


  constructor(private router: Router) {
  }

  @HostListener('click')
  onClick() {
    if (this.isSerie)
      this.router.navigate(["tv/", this.id]);
    else
      this.router.navigate(["/film/", this.id]);
  }


  colorOnVote(voto: number) {

    if (voto == -1) {
      this.voto = "";
      return "transparent";
    }

    if (voto < 50)
      return "red";
    else if (voto > 69)
      return "#1BD75F";
    else
      return "yellow";
  }
}
