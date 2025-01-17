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
  @Input() rating = 0;
  @Input() maxRating = 5;
  @Input() statico = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];

  constructor() {
    this.generateStars();
  }

    generateStars() {
    this.stars = Array(this.maxRating).fill(0);
  }

  setRating(newRating: number) {
    if (!this.statico) {
      this.rating = newRating;
      this.ratingChange.emit(this.rating);
    }
  }

  hoverRating(hoveredRating: number) {
    if (!this.statico) {
      this.rating = hoveredRating || this.rating;
    }
  }
}
