import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import {StarReviewComponent} from '../star-review/star-review.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule,StarReviewComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() comments: { text: string; rating: number; username: string; profilePic: string }[] = [];
  @Input() isModerator: boolean = false;
  @Output() deleteComment = new EventEmitter<number>();

  onDeleteComment(index: number) {
    this.deleteComment.emit(index);
  }
}
