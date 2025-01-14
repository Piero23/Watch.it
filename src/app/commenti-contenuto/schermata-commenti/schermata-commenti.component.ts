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
    text: string;
    rating: number;
    username: string;
    profilePic: string;
    replies: { text: string; rating: number; username: string; profilePic: string }[];
  }[] = [
    {
      text: 'questo film fa cagare',
      rating: 1,
      username: 'utente1',
      profilePic: 'assets/images/img.png',
      replies: [{text: 'ciao', rating: 2, username: 'giuseppe', profilePic: 'assets/images/img.png'}],
    },
    {
      text: 'bel film.',
      rating: 4,
      username: 'utente2',
      profilePic: 'assets/images/utente2.jpg',
      replies: [],
    },
  ];

  isModerator = true;
  replyingTo: { index: number; username: string; text: string } | null = null;

  addComment(newComment: { text: string; rating: number; username: string; profilePic: string }) {
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

  onReplyToComment(event: { index: number; username: string; text: string }) {
    this.replyingTo = event;
  }

  cancelReply() {
    this.replyingTo = null;
  }
}
