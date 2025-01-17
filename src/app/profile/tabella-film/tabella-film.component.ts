import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TMDBDataService} from '../../tmdbdata.service';
import {Router, RouterLink} from '@angular/router';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink],
  providers: [TMDBDataService],
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css']
})
export class TabellaFilmComponent implements OnInit{

  nameOrder=true;
  yearOrder=true;
  ratingOrder=true;

  username : string = ""


  righe: {id: number, anno: number, rating: number, nome: string, immagine: string}[]=[];

  constructor(private tmdb: TMDBDataService, private database: DatabaseService,private router : Router ) {}

  async ngOnInit() {
    const data =await this.database.utenteBySession()
    // @ts-ignore
    this.username = data.username;

    await this.getByStatus(0)
  }

  sortByName(){
    this.yearOrder=true;
    this.ratingOrder=true;

    if (this.nameOrder){
      this.righe.sort(function cmp(a, b){
        if (a.nome>b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
    else{
      this.righe.sort(function cmp(a, b){
        if (a.nome<b.nome) return 1;
        else return -1;
      })
      this.nameOrder=!this.nameOrder;
    }
  }

  sortByYear() {
    this.nameOrder=true;
    this.ratingOrder=true;

    if (this.yearOrder){
      this.righe.sort((a, b) => b.anno - a.anno)
      this.yearOrder=!this.yearOrder;
    }
    else{
      this.righe.sort((a, b) => a.anno - b.anno)
      this.yearOrder=!this.yearOrder;
    }
  }

  sortByRating() {
    console.log(this.righe);
    this.nameOrder=true;
    this.yearOrder=true;

    if (this.ratingOrder){
      this.righe.sort((a, b) => b.rating - a.rating);
      this.ratingOrder=!this.ratingOrder;
    }
    else{
      this.righe.sort((a, b) => a.rating - b.rating);
      this.ratingOrder=!this.ratingOrder;
    }
  }

  routeToFilm(id : number){
    this.router.navigate(["film",id]);
  }

  async getByStatus(status: number): Promise<void> {
    //0==Da Vedere
    //1==In Visione
    //2==Visto

    this.righe=[]



    const queryRows: any = await this.database.getContenutoByUtente(this.username);
    for (let riga of queryRows) {
      if (riga.status==status && riga.is_serie==0) {
        let movie: any = await this.tmdb.getMovieByID(riga.id_contenuto);
        const newRow: {id: number, anno: number, rating: number, nome: string, immagine: string} ={
          id: riga.id_contenuto,
          anno: movie.release_date.slice(0,4),
          rating: riga.rating,
          nome: movie.title,
          immagine: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'assets/images/PosterImageNotFound.png'
        }
        this.righe.push(newRow);
      }
    }
  }

  async setRating(id:number,voto:number){
    await this.database.changeRating(this.username,"film",id,voto);
  }

  activateButton(index: number){
    switch (index){
      case 2: {
        //Visto

        document.getElementsByName("visto").item(0).setAttribute("style", "background: #4CB2FD; color: black;");
        document.getElementsByName("daVedere").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        document.getElementsByName("inVisione").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        this.getByStatus(2)
        break;
      }
      case 0: {
        //Da Vedere

        document.getElementsByName("daVedere").item(0).setAttribute("style", "background: #4CB2FD; color: black;");
        document.getElementsByName("inVisione").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        document.getElementsByName("visto").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        this.getByStatus(0)
        break;
      }
    }
  }
}
