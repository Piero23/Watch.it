import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  http: HttpClient = inject(HttpClient);

  async getContenutoByUtente(utente: string) {
    return await this.http.get('http://localhost:8080/utente/getContenutiByUtente/' + utente).toPromise();
  }

  async getUtente(utente: string) {
    return await this.http.get('http://localhost:8080/utente/getUtente/' + utente).toPromise();
  }

  async setProPic(utente: string, image: any) {
    await this.http.post('http://localhost:8080/utente/setProPic/' + utente, image).toPromise();
  }

  async setBgImage(utente: string, image: any) {
    await this.http.post('http://localhost:8080/utente/setBgImage/' + utente, image).toPromise();
  }

  async getCommentiFromContenuto(tipo: string, id: number) {
    return await this.http.get('http://localhost:8080/contenuto/getCommenti/' + tipo + '/' + id).toPromise();
  }

  async aggiornaStatus(utente: string, tipo: string, id: number, status: number) {
    await this.http.get('http://localhost:8080/contenuto/updateStatus/' + utente + '/' + tipo + '/' + id + '/' + status).toPromise();
  }

  async aggiornaStagione(utente: string, id: number, stagione: number, episodio: number) {
    await this.http.get('http://localhost:8080/contenuto/updateSeries/' + utente + '/' + id + '/' + stagione + '/' + episodio).toPromise();
  }

  async saveNewComment(content_id: number, content_type: string, text: string, rating: number, user: string, answers_to: any) {
    const body = {
      content_id: content_id,
      content_type: content_type,
      text: text,
      rating: rating,
      user: user,
      answers_to: answers_to
    }

    await this.http.post('http://localhost:8080/commento/newComment', body, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }

  async deleteComment(id: number) {
    const body = {
      comment_id: id
    }
    await this.http.post('http://localhost:8080/commento/deleteComment', body, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }


  async register(username: string, mail: string, password: string) {
    const body = {
      username: username,
      mail: mail,
      password: password,
    }
    return await this.http.post('http://localhost:8080/utente/register', body, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }

  async logIn(mail: string, password: string) {
    const body = {
      mail: mail,
      password: password,
    }
    return await this.http.post('http://localhost:8080/utente/login', body, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }

  async logOut() {
    return await this.http.get('http://localhost:8080/utente/logout', {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }

  async utenteBySession() {
    return await this.http.get('http://localhost:8080/utente/getUserBySession', {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }).toPromise();
  }

  async deleteContenuto_Utente(utente: string, tipo: string, id: number) {
    return await this.http.get('http://localhost:8080/contenuto/deleteContent' + "/" + utente + "/" + tipo + "/" + id, {
      withCredentials: true
    }).toPromise()
  }

  async changeRating(utente: string, tipo: string, id: number, ratingNum: number) {
    return await this.http.get('http://localhost:8080/contenuto/editRating/' + utente + "/" + tipo + "/" + id + "/" + ratingNum, {
      withCredentials: true
    }).toPromise();
  }
}
