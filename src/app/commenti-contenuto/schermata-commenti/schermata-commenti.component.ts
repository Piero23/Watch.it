import { Component } from '@angular/core';
import {CommentItemComponent} from '../comment-item/comment-item.component';
import {CommentSectionComponent} from '../comment-section/comment-section.component';

@Component({
  selector: 'app-schermata-commenti',
  standalone: true,
  imports: [
    CommentItemComponent,
    CommentSectionComponent
  ],
  templateUrl: './schermata-commenti.component.html',
  styleUrl: './schermata-commenti.component.css'
})
export class SchermataCommentiComponent {
  title = 'WatchedIt';
  comments: {
    id: number;
    text: string;
    rating: number;
    username: string;
    profilePic: string;
    replies: {id: number ,text: string; rating: number; username: string; profilePic: string }[];
  }[] = [];

  isModerator = true;
  replyingTo: { id:number ,index: number; username: string; text: string } | null = null;

  addComment(newComment: {id: number ,text: string; rating: number; username: string; profilePic: string }) {
    if (this.replyingTo) {
      this.comments[this.replyingTo.index].replies.push({ ...newComment });
      this.replyingTo = null;
    } else {
      this.comments.unshift({ ...newComment, replies: [] });
    }
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }

  onReplyToComment(event: { id: number,index: number; username: string; text: string }) {
    this.replyingTo = event;
  }

  cancelReply() {
    this.replyingTo = null;
  }
}
