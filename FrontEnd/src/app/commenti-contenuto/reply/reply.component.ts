import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarReviewComponent} from '../star-review/star-review.component';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [CommonModule, StarReviewComponent],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent {
  @Input() replies: {
    text: string;
    rating: number;
    username: string;
    profilePic: string;
  }[] = [];
  @Output() deleteReply = new EventEmitter<number>();
  @Output() closePopup = new EventEmitter<void>();
  @Input() isModerator: boolean = false;

  onDeleteReply(index: number) {
    this.deleteReply.emit(index);
  }

  onClosePopup(): void {
    this.closePopup.emit();
  }
}
