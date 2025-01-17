import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-preview-commenti',
  standalone: true,
  imports: [],
  templateUrl: './preview-commenti.html',
  styleUrl: './preview-commenti.css'
})
export class PreviewCommenti implements OnInit {


  router : Router = inject(Router)
  route : ActivatedRoute = inject(ActivatedRoute);
  database: DatabaseService = inject(DatabaseService)
  firstComment: any;
  username: string = "";
  proPic : any

  @HostListener('click')
  onClick() {
    this.router.navigate([this.router.url,"comments"]);
  }

  async ngOnInit() {


    const data = await this.database.getCommentiFromContenuto(this.route.snapshot.params["contenuto"], this.route.snapshot.params["id"]);

    // @ts-ignore
    if (data.length > 0) {
      if (data) {
        // @ts-ignore
        this.firstComment = data[0].contenuto;
        // @ts-ignore
        this.username = data[0].username_utente;
      }
      console.log(this.firstComment);
    }

    const utente = await this.database.getUtente(this.username);

    // @ts-ignore
    if(utente.img_profilo){
      // @ts-ignore
      const imgBuffer = utente.img_profilo;
      this.proPic = `data:image/png;base64,${imgBuffer}`;
    }else
      this.proPic ="assets/images/Avatar.png"

  }
}

//<i class="fa-solid fa-circle-user text-white" style="font-size: clamp(30px,4dvw,50px)"></i>
