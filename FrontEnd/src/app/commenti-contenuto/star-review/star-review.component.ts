import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-star-review',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './star-review.component.html',
  styleUrl: './star-review.component.css'
})
export class StarReviewComponent {
  @Input() fixed = false;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() starRating = 0;
  starHover = 0;

  onStarHover(stars: number) {
    this.starHover = stars;
  }

  setRating(stars: number) {
    this.starRating = stars;
    this.ratingChange.emit(this.starRating);
  }
}
