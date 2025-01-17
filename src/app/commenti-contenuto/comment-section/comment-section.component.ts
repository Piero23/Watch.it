import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from '../reply/reply.component';
import { StarReviewComponent } from '../star-review/star-review.component';
import {DatabaseService} from '../../database.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule,StarReviewComponent,ReplyComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit{

  @Input() comments: {
    id: number;
    text: string;
    rating: number;
    username: string;
    profilePic: string;
    replies: {id : number,text: string; rating: number; username: string; profilePic: string }[];
  }[] = [];

  @Input() isModerator: boolean = false;
  @Output() deleteComment = new EventEmitter<number>();
  @Output() replyToComment = new EventEmitter<{ id: number,index: number; username: string; text: string }>();

  showRepliesPopup = false;
  activeReplies: any[] = [];
  activeCommentIndex: number = -1;

  database : DatabaseService = inject(DatabaseService)
  route : ActivatedRoute = inject(ActivatedRoute);

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
    const id  = this.comments[index].id
    this.replyToComment.emit({ id,index, username, text });
  }

  async ngOnInit(){
    const id = this.route.snapshot.params['id'];
    const content = this.route.snapshot.params['contenuto'];
    const datas = await this.database.getCommentiFromContenuto(content,id)
    console.log(datas)

    // @ts-ignore
    for (let data of datas) {

      const utente = await this.database.getUtente(data.username_utente);


      let userProfilePic
      // @ts-ignore
      if(utente.img_profilo) {
        // @ts-ignore
        userProfilePic = `data:image/png;base64,${utente.img_profilo}`;
      }else
        userProfilePic = "assets/images/Avatar.png"

      let riga : {
        id : number,
        text: string;
        rating: number;
        username: string;
        profilePic: string;
        replies: { id: number ,text: string; rating: number; username: string; profilePic: string }[];
      } = {
        id : data.id_commento,
        text: data.contenuto,
        rating: data.voto,
        username: data.username_utente,
        profilePic: userProfilePic,
        replies : []
      }

      for (let rispost of data.risposte){
        const utente2 = await this.database.getUtente(rispost.username_utente);

        let userProfilePic2
        // @ts-ignore
        if(utente2.img_profilo) {
          // @ts-ignore
          userProfilePic2 = `data:image/png;base64,${utente2.img_profilo}`;
        }else
          userProfilePic2 = "assets/images/Avatar.png"

        const resp = {
          id: rispost.id_commento,
          text: rispost.contenuto,
          rating: rispost.voto,
          username: rispost.username_utente,
          profilePic: userProfilePic2,
        }

        riga.replies.push(resp);
      }

      this.comments.push(riga);
    }

  }
}
