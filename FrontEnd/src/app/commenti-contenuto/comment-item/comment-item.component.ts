import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StarReviewComponent} from '../star-review/star-review.component';
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

  bannedWords: string[] = [
    "abcdiet", "affanculo", "anabootcampdiet", "bagasce", "bagascia", "bagascione",
    "baldracca", "baldraccacce", "baldraccaccia", "baldracche", "baldraccona",
    "baldraccone", "bariledimerda", "bastardacce", "bastardacci", "bastardaccia",
    "bastardaccio", "bastardamadonna", "bastarde", "bastardi", "bastardo", "bastardona",
    "bastardone", "bastardoni", "battona", "battone", "bbwpit", "bocchinara",
    "bocchinare", "bocchinari", "bocchinaro", "budellodidio", "bustadipiscio",
    "cacaminchia", "cacare", "cacasotto", "cagacazzo", "cagaminchia", "cagare",
    "cagasotto", "canacciodidio", "canagliadidio", "caned'allah", "caned'eva",
    "canedidio", "cazzacci", "cazzaccio", "cazzata", "cazzate", "cazzetti",
    "cazzetto", "cazzi", "cazzissimo", "cazzo", "cazzona", "cazzone", "cazzoni",
    "cazzuta", "cazzute", "cazzuti", "cazzutissimo", "cazzuto", "cesso", "checca",
    "checche", "chiavare", "chiavata", "chiavate", "chiavatona", "chiavatone",
    "ciucciamelo", "ciucciapalle", "cogliona", "coglionaggine", "coglionare",
    "coglionata", "coglionate", "coglionatore", "coglionatrice", "coglionatura",
    "coglionature", "coglionazzi", "coglionazzo", "coglioncelli", "coglioncello",
    "coglioncini", "coglioncino", "coglione", "coglioneria", "coglionerie",
    "coglioni", "coprofago", "coprofilo", "cornutoilpapa", "credoana", "cretinetti",
    "cristod'undio", "cristodecapitato", "cristoincroce", "culattone", "culattoni",
    "culi", "culo", "culona", "culone", "deficiente", "dietaabc", "dietaana",
    "dietaanabootcamp", "dietabootcamp", "dietadell'abc", "diobastardo", "diobestia",
    "diobestiazza", "dioboia", "diocan", "diocane", "diocannaiolo", "diocapra",
    "diocoglione", "diocomunista", "diocrasto", "diocristo", "dioculattone",
    "diofarabutto", "diofascista", "diofinocchio", "dioflagellato", "dioimpestato",
    "dioimpiccato", "dioladro", "diolebbroso", "diolobotomizzato", "diolurido",
    "diomaiale", "diomaledetto", "diomerda", "diominchione", "dionegro", "dioporco",
    "diopoveraccio", "diopovero", "diorotto", "diorottoinculo", "diorutto",
    "diosbudellato", "dioschifoso", "dioseppellito", "dioserpente", "diostracane",
    "diostramerda", "diostronzo", "diosventrato", "dioverme", "facciadaculo",
    "facciadimerda", "fanculo", "fica", "ficata", "ficate", "fichetta", "fichette",
    "fichetti", "fichetto", "ficona", "ficone", "figa", "figata", "figate", "fighe",
    "fighetta", "fighette", "fighetti", "fighetto", "figliadicane", "figliadimignotta",
    "figliadiputtana", "figliaditroia", "figlidicani", "figlidimignotta",
    "figlidiputtana", "figliditroia", "figliedicani", "figliedimignotta",
    "figliediputtana", "figlieditroia", "figliodicane", "figliodimignotta",
    "figliodiputtana", "figlioditroia", "figona", "figone", "figoni", "fottere",
    "fottiti", "fottuta", "fottute", "fottuti", "fottutissima", "fottutissime",
    "fottutissimi", "fottutissimo", "fottuto", "fregna", "frocetto", "froci",
    "frociara", "frociaro", "frociarola", "frociarolo", "frocio", "frocione",
    "frocioni", "frocissimo", "gesùcristaccio", "gesùesorcizzato", "gesùhandicappato",
    "gesùimpasticcato", "gesùmalandato", "gesùradioattivo", "gesùsieropositivo",
    "gesùstordito", "gesùzozzo", "incazzare", "incazzata", "incazzate", "incazzati",
    "incazzatissima", "incazzatissime", "incazzatissimi", "incazzatissimo",
    "incazzato", "inculare", "inculata", "inculate", "infrociato", "leccacazzi",
    "leccaculi", "leccaculo", "leccafica", "leccafiga", "leccafighe", "leccapalle",
  ];

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

    window.location.reload()

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
