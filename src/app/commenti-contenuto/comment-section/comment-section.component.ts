import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from '../reply/reply.component';
import { StarReviewComponent } from '../star-review/star-review.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule,StarReviewComponent,ReplyComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() comments: {
    text: string;
    rating: number;
    username: string;
    profilePic: string;
    replies: { text: string; rating: number; username: string; profilePic: string }[];
  }[] = [];
  @Input() isModerator: boolean = false;
  @Output() deleteComment = new EventEmitter<number>();
  @Output() replyToComment = new EventEmitter<{ index: number; username: string; text: string }>();

  showRepliesPopup = false;
  activeReplies: any[] = [];
  activeCommentIndex: number = -1;

  openRepliesPopup(replies: any[], index: number): void {
    this.activeReplies = replies;
    this.activeCommentIndex = index;
    this.showRepliesPopup = true;
  }

  handleDeleteReply(index: number): void {
    this.comments[this.activeCommentIndex].replies.splice(index, 1);
  }

  onDeleteComment(index: number) {
    this.deleteComment.emit(index);
  }

  onReplyToComment(index: number, username: string, text: string) {
    this.replyToComment.emit({ index, username, text });
  }
}
