import {Component, inject, OnInit} from '@angular/core';
import {CommentItemComponent} from '../comment-item/comment-item.component';
import {CommentSectionComponent} from '../comment-section/comment-section.component';
import {DatabaseService} from '../../database.service';

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
export class SchermataCommentiComponent implements OnInit {
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

  database: DatabaseService= inject(DatabaseService);

  addComment(newComment: {id: number ,text: string; rating: number; username: string; profilePic: string }) {
    if (this.replyingTo) {
      this.comments[this.replyingTo.index].replies.push({ ...newComment });
      this.replyingTo = null;
    } else {
      this.comments.unshift({ ...newComment, replies: [] });
    }
  }

  async deleteComment(index: number) {

    await this.database.deleteComment(this.comments[index].id);
    this.comments.splice(index, 1);
  }

  onReplyToComment(event: { id: number,index: number; username: string; text: string }) {
    this.replyingTo = event;
  }

  cancelReply() {
    this.replyingTo = null;
  }

  async  ngOnInit() {
    const data = await this.database.utenteBySession()

    console.log(data)
    // @ts-ignore
    if(data.status == 200){
      // @ts-ignore
      const user = await this.database.getUtente(data.username)
      // @ts-ignore
      this.isModerator = user.admin
      console.log("Moderatore",this.isModerator)
    }
  }
}
