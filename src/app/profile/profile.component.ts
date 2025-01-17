import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {TabellaFilmComponent} from './tabella-film/tabella-film.component';
import {TabellaSerieTvComponent} from './tabella-serie-tv/tabella-serie-tv.component';
import {BannerEditorComponent} from './banner-editor/banner-editor.component';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
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

  username : string = "";
  propic: any="";
  banner: any ="";

  database : DatabaseService = inject(DatabaseService);

  activateButton(index: number){
    switch (index){
      case 0: {
        this.showFilm = true;

        document.getElementsByName("film").item(0).setAttribute("style", "background: #1BD75F; color: black;");
        document.getElementsByName("serie").item(0).setAttribute("style", "background: #282828; color: lightgray;");

        break;
      }
      case 1: {
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

  convertBlobToBase64(blobUrl: string): Promise<string> {
    return fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  }

  async closeBanner(image : any, type : string){
    this.bannerEditor=false;


    switch(type){
      case "Banner": {
        this.convertBlobToBase64(image).then(async (base64Image) => {
          const base64Data = base64Image.split(',')[1];
          await this.database.setBgImage(this.username, base64Data)
        })
        break;
      }
      case "Foto Profilo": {
        this.convertBlobToBase64(image).then(async (base64Image) => {
          const base64Data = base64Image.split(',')[1];
          await this.database.setProPic(this.username, base64Data)

        })
        break;
      }
    }
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

    // @ts-ignore
    if(utente.img_profilo){
      // @ts-ignore
      const imgBuffer = utente.img_profilo;
      this.propic = `data:image/png;base64,${imgBuffer}`;
    }else
      this.propic ="assets/images/Avatar.png"

    // @ts-ignore
    if (utente.imgbackground) {
      // @ts-ignore
      const imgBuffer = utente.imgbackground;
      this.banner = `data:image/png;base64,${imgBuffer}`;
    }else
      this.banner ="assets/images/immagine.png"


  }

  denyAll() {
    this.bannerEditor=false;
  }

}

