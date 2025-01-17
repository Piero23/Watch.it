import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../database.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-preview-commenti',
  standalone: true,
  imports: [
    NgIf
  ],
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
    this.route.params.subscribe(async params => {


      const data = await this.database.getCommentiFromContenuto(this.route.snapshot.params["contenuto"], this.route.snapshot.params["id"]);

      let utente: any
      // @ts-ignore
      if (data.length > 0) {
        if (data) {
          // @ts-ignore
          this.firstComment = data[0].contenuto;
          // @ts-ignore
          this.username = data[0].username_utente;
        }
        console.log(this.firstComment);
        utente = await this.database.getUtente(this.username);
      }else
        this.firstComment = "Ancora nessun commento sii il primo a commentare";

      // @ts-ignore
      if(utente.img_profilo != null){
        // @ts-ignore
        const imgBuffer = utente.img_profilo;
        this.proPic = `data:image/png;base64,${imgBuffer}`;
      }else {
        this.proPic = "assets/images/Avatar.png"
      }
    })



  }
}

//<i class="fa-solid fa-circle-user text-white" style="font-size: clamp(30px,4dvw,50px)"></i>
