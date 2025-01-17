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
  errorMessage: string | null = null;

  bannedWords: string[] = ["allupato", "ammucchiata", "anale", "arrapato", "arrusa", "arruso", "assatanato",
    "bagascia", "bagassa", "bagnarsi", "baldracca", "balle", "battere", "battona",
    "belino", "biga", "bocchinara", "bocchino", "bofilo", "boiata", "bordello",
    "brinca", "bucaiolo", "budiùlo", "busone", "cacca", "caciocappella", "cadavere",
    "cagare", "cagata", "cagna", "casci", "cazzata", "cazzimma", "cazzo", "cesso",
    "cazzone", "checca", "chiappa", "chiavare", "chiavata", "ciospo", "ciucciami il cazzo",
    "coglione", "coglioni", "cornuto", "cozza", "culattina", "culattone", "culo",
    "ditalino", "fava", "femminuccia", "fica", "figa", "figlio di buona donna",
    "figlio di puttana", "figone", "finocchio", "fottere", "fottersi", "fracicone",
    "fregna", "frocio", "froscio", "goldone", "guardone", "imbecille", "incazzarsi",
    "incoglionirsi", "ingoio", "leccaculo", "lecchino", "lofare", "loffa", "loffare",
    "mannaggia", "merda", "merdata", "merdoso", "mignotta", "minchia", "minchione",
    "mona", "monta", "montare", "mussa", "nave scuola", "nerchia", "padulo", "palle",
    "palloso", "patacca", "patonza", "pecorina", "pesce", "picio", "pincare", "pippa",
    "pinnolone", "pipì", "pippone", "pirla", "pisciare", "piscio", "pisello", "pistolotto",
    "pomiciare", "pompa", "pompino", "porca", "porca madonna", "porca miseria",
    "porca puttana", "porco", "porco due", "porco zio", "potta", "puppami", "puttana",
    "quaglia", "recchione", "regina", "rincoglionire", "rizzarsi", "rompiballe",
    "rompipalle", "ruffiano", "sbattere", "sbattersi", "sborra", "sborrata", "sborrone",
    "sbrodolata", "scopare", "scopata", "scorreggiare", "sega", "slinguare", "slinguata",
    "smandrappata", "soccia", "socmel", "sorca", "spagnola", "spompinare", "sticchio",
    "stronza", "stronzata", "stronzo", "succhiami", "succhione", "sveltina", "sverginare",
    "tarzanello", "terrone", "testa di cazzo", "tette", "tirare", "topa", "troia",
    "trombare", "vacca", "vaffanculo", "vangare", "zinne", "zio cantante", "zoccola"]

  updateStarRating(rating: number) {
    this.starRating = rating;
  }

  private containsProfanity(text: string): boolean {
    const regex = new RegExp(this.bannedWords.join('|'), 'i');
    return regex.test(text);
  }

  postComment() {
    if (this.containsProfanity(this.commentText)) {
      this.errorMessage = 'Il commento contiene parole vietate. Modificalo e riprova.';
      return;
    }
    this.errorMessage = null;

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
