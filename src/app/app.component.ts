import { Component } from '@angular/core';
import {CommentItemComponent} from './comment-item/comment-item.component';
import {CommentSectionComponent} from './comment-section/comment-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommentItemComponent, CommentSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  comments: { text: string; rating: number; username: string; profilePic: string }[] = [
    {
      text: 'questo film fa cagare',
      rating: 1,
      username: 'utente1',
      profilePic: '',
    },
    {
      text: 'bel film.',
      rating: 4,
      username: 'utente2',
      profilePic: '',
    },
    {
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      rating: 3,
      username: 'utente',
      profilePic: '',
    },
  ];

  isModerator = true;

  addComment(newComment: { text: string; rating: number }) {
    this.comments.unshift({
      ...newComment,
      username: 'Nome Utente',
      profilePic: '',
    });
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }
}
