import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TMDBDataService} from '../../tmdbdata.service';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-tabella-film',
  standalone: true,
  imports: [NgForOf, FormsModule],
  providers: [TMDBDataService],
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css']
})
export class TabellaFilmComponent implements OnInit {

  nameOrder = true;
  yearOrder = true;
  ratingOrder = true;

  username: string = ""


  righe: { id: number, anno: number, rating: number, nome: string, immagine: string, viewingStatus: number }[] = [];

  constructor(private tmdb: TMDBDataService, private database: DatabaseService) {
  }

  async ngOnInit() {
    const data = await this.database.utenteBySession()
    // @ts-ignore
    this.username = data.username;

    await this.getByStatus(0)
  }

  sortByName() {
    this.yearOrder = true;
    this.ratingOrder = true;

    if (this.nameOrder) {
      this.righe.sort(function cmp(a, b) {
        if (a.nome > b.nome) return 1;
        else return -1;
      })
      this.nameOrder = !this.nameOrder;
    } else {
      this.righe.sort(function cmp(a, b) {
        if (a.nome < b.nome) return 1;
        else return -1;
      })
      this.nameOrder = !this.nameOrder;
    }
  }

  sortByYear() {
    this.nameOrder = true;
    this.ratingOrder = true;

    if (this.yearOrder) {
      this.righe.sort((a, b) => b.anno - a.anno)
      this.yearOrder = !this.yearOrder;
    } else {
      this.righe.sort((a, b) => a.anno - b.anno)
      this.yearOrder = !this.yearOrder;
    }
  }

  sortByRating() {

    this.nameOrder = true;
    this.yearOrder = true;

    if (this.ratingOrder) {
      this.righe.sort((a, b) => b.rating - a.rating);
      this.ratingOrder = !this.ratingOrder;
    } else {
      this.righe.sort((a, b) => a.rating - b.rating);
      this.ratingOrder = !this.ratingOrder;
    }
  }

  async getByStatus(status: number): Promise<void> {
    this.righe = []

    const queryRows: any = await this.database.getContenutoByUtente(this.username);
    for (let riga of queryRows) {
      if (riga.status == status && riga.is_serie == 0) {
        let movie: any = await this.tmdb.getMovieByID(riga.id_contenuto);
        const newRow: {
          id: number,
          anno: number,
          rating: number,
          nome: string,
          immagine: string,
          viewingStatus: number
        } = {
          id: riga.id_contenuto,
          anno: movie.release_date.slice(0, 4),
          rating: riga.rating,
          nome: movie.title,
          immagine: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'assets/images/PosterImageNotFound.png',
          viewingStatus: riga.status
        }
        this.righe.push(newRow);
      }
    }
  }

  async setRating(id: number, voto: number) {
    await this.database.changeRating(this.username, "film", id, voto);
  }

  activateButton(index: number) {
    switch (index) {
      case 2: {
        document.getElementsByName("visto").item(0).setAttribute("style", "background: #4CB2FD; color: black;");
        document.getElementsByName("daVedere").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        this.getByStatus(2)
        break;
      }
      case 0: {
        document.getElementsByName("daVedere").item(0).setAttribute("style", "background: #4CB2FD; color: black;");
        document.getElementsByName("visto").item(0).setAttribute("style", "background: #282828; color: lightgray;");
        this.getByStatus(0)
        break;
      }
    }
  }

  async deleteRow(id: number) {
    this.righe = this.righe.filter(riga => riga.id !== id);
    await this.database.deleteContenuto_Utente(this.username, "film", id);
  }

  async updateStatus(id: number, status: number) {
    this.righe = this.righe.filter(riga => riga.id !== id);
    await this.database.aggiornaStatus(this.username, "film", id, status)
  }
}
