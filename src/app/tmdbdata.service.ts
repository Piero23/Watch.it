import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TMDBDataService {

  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjUxZTE4ZWFjOWVkMGFmYjllMzlmZjQwMmU1MzM0MyIsIm5iZiI6MTczNTk4NDU5Ni40OTIsInN1YiI6IjY3NzkwNWQ0MWEyZGY1OWFkMzc0YzFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jvMdIPVVrD1WIQXKFkm2Q6Sv5Rm9shjw1dfqwuPs39E';

  http: HttpClient = inject(HttpClient)
  constructor() {}
  data: any = []

    private async fetchContent(url:string){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': this.API_KEY,
    });
    return await firstValueFrom(this.http.get(url, {headers}));
  }

  async getMovieByID(id : number):Promise<any>{
    return await this.fetchContent(this.API_URL + "/movie/+" + id + "?language=it-IT")
  }

    async getTvSeriesByID(id:number){
    return await this.fetchContent(this.API_URL + "/tv/" + id + "?language=it-IT")
  }

  async getTvSeriesSeason(id:string, season:number){
    return await this.fetchContent(this.API_URL + "/tv/" + id + "/season/" + season + "?language=it-IT")
  }

  async searchEverything(search : string){
    this.data = await this.fetchContent(this.API_URL+'/search/multi?query='+search+'&include_adult=true&language=it-IT&page=1');
    return this.data.results
  }

  async getSimilarMovies(filmID:number){
    this.data = await this.fetchContent(this.API_URL+"/movie/"+filmID+"/similar");
    return this.data.results
  }

  async getFilmsByGenre(genreID:number){
    this.data = await this.fetchContent(this.API_URL+"/discover/movie?include_adult=true&include_video=false&language=it-IT&page=1&sort_by=popularity.desc&with_genres="+genreID);
    return this.data.results
  }

  async getTrendingMovies(){
    const data = await this.fetchContent(this.API_URL+"/trending/movie/week?language=it-IT")
    // @ts-ignore
    return data.results
  }

  async getTrendingTvSeries(){
    const data = await this.fetchContent(this.API_URL+"/trending/tv/week?language=it-IT")
    // @ts-ignore
    return data.results
  }

  async getMostLovedMovies(){
    const data = await this.fetchContent(this.API_URL+"/movie/top_rated?language=it-IT")
    // @ts-ignore
    return data.results
  }

  async getMostLovedTvSeries(){
    const data = await this.fetchContent(this.API_URL+"/tv/top_rated?language=it-IT")
    // @ts-ignore
    return data.results
  }

}
