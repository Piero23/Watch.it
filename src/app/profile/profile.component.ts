import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {TabellaFilmComponent} from './tabella-film/tabella-film.component';
import {TabellaSerieTvComponent} from './tabella-serie-tv/tabella-serie-tv.component';
import {BannerEditorComponent} from './banner-editor/banner-editor.component';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TabellaFilmComponent,
    TabellaSerieTvComponent,
    NgIf,
    BannerEditorComponent,
    NgStyle
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  showFilm: boolean = true;
  bannerEditor: boolean=false;

  aspectRatio: number=0;
  oggettoDaModificare: string = "";

  username : string = "  Ciaoo";
  propic: string="assets/images/Avatar.png";
  banner: string="assets/images/Immagine.png";

  database : DatabaseService = inject(DatabaseService);

  activateButton(index: number){
    switch (index){
      case 0: {
        //Film
        this.showFilm = true;

        document.getElementsByName("film").item(0).setAttribute("style", "background: #1BD75F; color: black;");
        document.getElementsByName("serie").item(0).setAttribute("style", "background: #282828; color: lightgray;");

        break;
      }
      case 1: {
        //Serie TV
        this.showFilm = false;

        document.getElementsByName("serie").item(0).setAttribute("style", "background: #1BD75F; color: black;");
        document.getElementsByName("film").item(0).setAttribute("style", "background: #282828; color: lightgray;");

        break;
      }
    }
  }

  editProPic(){
    this.bannerEditor=true;
    this.aspectRatio=1;
    this.oggettoDaModificare="Foto Profilo";
  }

  editBanner(){
    this.bannerEditor=true;
    this.aspectRatio=1/0.16;
    this.oggettoDaModificare="Banner";
  }

  closeBanner(){
    this.bannerEditor=false;
  }

  setProPic(propic: string){
    this.propic=propic;
  }

  setBanner(banner: string){
    this.banner=banner;
  }

  async ngOnInit() {
    const data =await this.database.utenteBySession()

    // @ts-ignore
    this.username = data.username;

    const utente = await this.database.getUtente(this.username);

    console.log(utente);
    // @ts-ignore
    if(utente.img_profilo){
      //Array DI Byte
    }
    // @ts-ignore
    if(utente.imgbackground){
      //Array DI Byte
    }
  }

}

