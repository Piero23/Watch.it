import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-stelle-film',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './stelle-film.component.html',
  styleUrl: './stelle-film.component.css'
})
export class StelleFilmComponent {
  @Input() rating = 0; // Valutazione corrente
  @Input() maxRating = 5; // Numero massimo di stelle
  @Input() statico = false; // Impedisce modifiche se true
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];

  constructor() {
    this.generateStars();
  }

  ngOnChanges() {
    this.generateStars();
  }

  generateStars() {
    this.stars = Array(this.maxRating).fill(0);
  }

  setRating(newRating: number) {
    if (!this.statico) { // Permetti modifiche solo se statico è false
      this.rating = newRating;
      this.ratingChange.emit(this.rating);
    }
  }

  hoverRating(hoveredRating: number) {
    if (!this.statico) { // Permetti hover solo se statico è false
      this.rating = hoveredRating || this.rating;
    }
  }
}
