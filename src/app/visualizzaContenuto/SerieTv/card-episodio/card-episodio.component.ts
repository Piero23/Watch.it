import {Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-card-episodio',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    NgIf
  ],
  templateUrl: './card-episodio.component.html',
  styleUrl: './card-episodio.component.css',
  host: {class: "rounded-4  justify-content-between"}
})
export class CardEpisodioComponent implements OnInit {
  @Input() infoEpisodio : any
  @Output() checked = new EventEmitter<void>();

  titolo: string = "Grazia Anatomia"
  descrizione: string = "This is a recap episode, otherwise known as a clip show. If you want to get caught up on everything from the interns first day to the mischief of the last episode, then this is the episode to watch. Prepare for May sweeps by getting caught up with this episode."
  durata: string = "12 min"
  voto: number = 85
  episodio: number = 1
  serie:number = 1
  image: any;
  votoColor : string = "#ff0000"
  vero: boolean = false;
  Rifiniture: boolean = false;



  ngOnInit(){
    this.titolo = this.infoEpisodio.name
    this.descrizione = this.infoEpisodio.overview || "Descrizione non disponibile"
    this.durata = this.infoEpisodio.runtime ? this.infoEpisodio.runtime + "min" : ""
    this.voto = this.infoEpisodio.vote_average.toFixed(1)*10
    this.image = this.infoEpisodio?.still_path
      ? `https://image.tmdb.org/t/p/w500${this.infoEpisodio.still_path}`
      : 'assets/images/BackdropImageNotFound.png';
    this.votoColor = this.infoEpisodio.vote_count == 0? "Gray" :this.voto >= 80 ? 'green' : this.voto >= 60 ? 'yellow' : 'red';


  }


  onCheckboxChange(): void {
    this.checked.emit();
  }
}
