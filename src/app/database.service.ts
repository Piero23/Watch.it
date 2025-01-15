import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  http: HttpClient = inject(HttpClient);

  //Utente
  async getContenutoByUtente(utente: string){
    return await this.http.get('http://localhost:8080/utente/getContenutiByUtente/'+utente).toPromise();
  }

  async getUtente(utente: string){
    return await this.http.get('http://localhost:8080/utente/getUtente/'+utente).toPromise();
  }

  async setProPic(utente: string, image: Blob){
    await this.http.post('http://localhost:8080/utente/setProPic/'+utente, image).toPromise();
  }

  async setBgImage(utente: string, image: Blob){
    await this.http.post('http://localhost:8080/utente/setBgImage/'+utente, image).toPromise();
  }

  //Contenuto

  async getCommentiFromContenuto(tipo: string, id: number){
    //tipo: movie/tv
    return await this.http.get('http://localhost:8080/contenuto/getCommenti/'+tipo+'/'+id).toPromise();
  }

  async aggiornaStatus(utente: string, tipo: string, id: number, status: number){
    //tipo: movie/tv
    await this.http.get('http://localhost:8080/contenuto/updateStatus/'+utente+'/'+tipo+'/'+id+'/'+status).toPromise();
  }

  async aggiornaStagione(id: number, stagione: number, episodio: number){
    //tipo: movie/tv
    await this.http.get('http://localhost:8080/contenuto/updateSeries/'+id+'/'+stagione+'/'+episodio).toPromise();
  }

  //Commento

  async setAnswer(questionId: number, answerId: number){
    await this.http.get('http://localhost:8080/commento/setAnswer/'+questionId+'/'+answerId).toPromise();
  }

  async saveNewComment(comment_id: number, content_id: number, content_type: boolean, body: string, rating: number, user: string, answers_to: number){
    await this.http.get('http://localhost:8080/commento//newComment/'+comment_id+'/'+content_id+'/'+content_type+'/'+body+'/'+rating+'/'+user+'/'+answers_to).toPromise();
  }

}
