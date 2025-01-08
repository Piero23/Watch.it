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

}
