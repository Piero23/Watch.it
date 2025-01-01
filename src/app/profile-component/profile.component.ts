import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {TabellaFilmComponent} from '../tabella-film-component/tabella-film.component';
import {TabellaSerieTvComponent} from '../tabella-serie-tv-component/tabella-serie-tv.component';
import {style} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {BannerEditorComponent} from '../banner-editor-component/banner-editor.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TabellaFilmComponent,
    TabellaSerieTvComponent,
    NgIf,
    BannerEditorComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  showFilm: boolean = true;
  editor: boolean=false;

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

}

