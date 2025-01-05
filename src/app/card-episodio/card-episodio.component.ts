import {Component, Input, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-episodio',
  standalone: true,
  imports: [],
  templateUrl: './card-episodio.component.html',
  styleUrl: './card-episodio.component.css',
  host: {class: "rounded-4  justify-content-between"}
})
export class CardEpisodioComponent implements OnInit {
  titolo: string = "Grazia Anatomia"
  descrizione: string = "This is a recap episode, otherwise known as a clip show. If you want to get caught up on everything from the interns first day to the mischief of the last episode, then this is the episode to watch. Prepare for May sweeps by getting caught up with this episode."
  durata: string = "12 min"
  voto: number = 85
  episodio: number = 1
  serie:number = 1
  image : any
  @Input() infoEpisodio : any

  ngOnInit(){
    this.titolo = this.infoEpisodio.name
    this.descrizione = this.infoEpisodio.overview
    this.durata = this.infoEpisodio.runtime +" min"
    this.voto = this.infoEpisodio.vote_average
    this.image = this.infoEpisodio?.still_path
      ? `https://image.tmdb.org/t/p/w500${this.infoEpisodio.still_path}`
      : 'URL immagine non disponibile';
  }
}
