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
  private searchUrl: string = this.API_URL+"/search/movie?"+this.API_KEY

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
        this.data = data;
      }
    )
  }

  public getMovies(){
    return this.fetchMovies("/discover/movie?sort_by=popularity.desc&")
  }


  fetchMovies(url:string){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });

    return this.http.get(this.API_URL+url,{headers})
  }


  getMovieByID(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });

    return this.http.get(this.API_URL+"/movie/1156593?language=en-US",{headers})
  }

  public searchMovies(search:string){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });
    return this.http.get(this.searchUrl+"&query="+search,{headers})
  }

}
