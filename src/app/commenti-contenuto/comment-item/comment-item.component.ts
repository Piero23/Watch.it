import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarReviewComponent } from '../star-review/star-review.component';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule, StarReviewComponent],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent {
  @Output() commentPosted = new EventEmitter<{ text: string; rating: number }>();
  commentText = '';
  starRating = 0;

  updateStarRating(rating: number) {
    this.starRating = rating;
  }

  postComment() {
    if (this.commentText.trim()) {
      this.commentPosted.emit({ text: this.commentText, rating: this.starRating });
      this.commentText = '';
      this.starRating = 0;
    }
  }
}
