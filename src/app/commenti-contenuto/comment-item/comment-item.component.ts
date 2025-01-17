import {Component, Output, Input, EventEmitter, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { StarReviewComponent } from '../star-review/star-review.component';
import {DatabaseService} from '../../database.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule, StarReviewComponent],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit{
  @Input() replyingTo: { id: number,username: string; text: string } | null = null;
  @Output() commentPosted = new EventEmitter<{id : number ,text: string; rating: number; username: string; profilePic: string }>();
  @Output() cancelReply = new EventEmitter<void>();


  database : DatabaseService = inject(DatabaseService)
  route : ActivatedRoute = inject(ActivatedRoute);

  username = 'prova';
  userProfilePic = 'assets/images/banner.png';
  commentText = '';
  starRating = 0;

  updateStarRating(rating: number) {
    this.starRating = rating;
  }


  postComment() {

    this.commentPosted.emit({
      id: -1,
      text: this.commentText,
      rating: this.starRating,
      username: this.username,
      profilePic: this.userProfilePic,
    });

    let resp = null
    if(this.replyingTo){
      resp = this.replyingTo.id
    }

    this.database.saveNewComment(this.route.snapshot.params["id"],this.route.snapshot.params["contenuto"],this.commentText,this.starRating,this.username,resp)

    this.commentText = '';
    this.starRating = 0;

  }

  async ngOnInit(){
    const data = await this.database.utenteBySession();

    // @ts-ignore
    this.username = data.username;
    const utente = await this.database.getUtente(this.username);
    // @ts-ignore
    if(utente.img_profilo) {
      // @ts-ignore
      const imgBuffer = utente.img_profilo;
      this.userProfilePic = `data:image/png;base64,${imgBuffer}`;
    }else
      this.userProfilePic = "assets/images/Avatar.png"
  }
}
