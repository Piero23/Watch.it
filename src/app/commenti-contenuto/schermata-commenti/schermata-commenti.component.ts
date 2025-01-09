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
  comments: { text: string; rating: number; username: string; profilePic: string }[] = [
    {
      text: 'questo film fa cagare',
      rating: 1,
      username: 'utente1',
      profilePic: "assets/images/img.png",
    },
    {
      text: 'bel film.',
      rating: 4,
      username: 'utente2',
      profilePic: "assets/images/utente2.jpg",
    },
    {
      text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      rating: 3,
      username: 'utente',
      profilePic: "assets/images/Avatar.png",
    },
  ];

  isModerator = true;

  addComment(newComment: {text: string; rating: number, username: string, profilePic : string}) {
    this.comments.unshift(newComment);
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }
}
