import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TMDBDataService {

  private API_URL = 'https://api.themoviedb.org/3'; // Replace with your API endpoint
  private API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjUxZTE4ZWFjOWVkMGFmYjllMzlmZjQwMmU1MzM0MyIsIm5iZiI6MTczNTk4NDU5Ni40OTIsInN1YiI6IjY3NzkwNWQ0MWEyZGY1OWFkMzc0YzFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jvMdIPVVrD1WIQXKFkm2Q6Sv5Rm9shjw1dfqwuPs39E';
  private IMG_URL = 'https://image.tmdb.org/t/p/w500';

  http: HttpClient = inject(HttpClient)
  constructor() {}

  data: any = []

  public confermation() {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });

    this.http
      .get(this.API_URL+"/authentication",{headers}).subscribe(
      (data:any) =>{
        console.log(data);
        this.data = data;
      }
    )
  }

  public getMovies(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });

    return this.http.get(this.API_URL+"/discover/movie?sort_by=popularity.desc&",{headers})

  }

}
