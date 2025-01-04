import {Component, HostListener, Input, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-ricerca',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card-ricerca.component.html',
  styleUrl: './card-ricerca.component.css',
  host: {class: "rounded-4"}
})
export class CardRicercaComponent {

  @Input()titolo: string = "Grazia Anatomia"
  @Input() descrizione: string = "This is a recap episode, otherwise known as a clip show. If you want to get caught up on everything from the interns first day to the mischief of the last episode, then this is the episode to watch. Prepare for May sweeps by getting caught up with this episode."
  @Input() dataRilascio: string = "2000"
  @Input() voto: number = 85
  @Input() episodio: number = 1
  @Input() serie:number = 1
  @Input() image : string = ""

  constructor(private router: Router) { }
  @HostListener('click')
  onClick() {
    this.router.navigate(["film/as"]);
  }
}
