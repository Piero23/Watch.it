import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-card-episodio',
  standalone: true,
  imports: [],
  templateUrl: './card-episodio.component.html',
  styleUrl: './card-episodio.component.css',
  host: {class: "rounded-4  justify-content-between"}
})
export class CardEpisodioComponent {
  @Input()titolo: string = "Grazia Anatomia"
  descrizione: string = "This is a recap episode, otherwise known as a clip show. If you want to get caught up on everything from the interns first day to the mischief of the last episode, then this is the episode to watch. Prepare for May sweeps by getting caught up with this episode."
  durata: string = "12 min"
  voto: number = 85
  @Input() episodio: number = 1
  @Input() serie:number = 1
}
