import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';


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


  //OGNUNA DI QUESTE FUNZIONI DEVE ESSERE CHIAMATA IN UN METODO ASYNC CON UN await di fronte per riceverne il valore

  async confermation() {

    const data = await this.fetchContent(this.API_URL+"/authentication")
    // @ts-ignore
    return data.results
  }

  async getPopularMovies(){
    const data = await this.fetchContent(this.API_URL+"/discover/movie?sort_by=popularity.desc&")
    // @ts-ignore
    return data.results
  }


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

  async searchMovies(search:string){
    this.data = await this.fetchContent(this.API_URL+"/search/movie?"+this.API_KEY+"&query="+search);
    // @ts-ignore
    return this.data.results
  }

  async searchTvSeries(search:string){
    this.data = await this.fetchContent(this.API_URL+"/search/tv?"+this.API_KEY+"&query="+search);
    // @ts-ignore
    return this.data.results
  }

  async getPopularTvSeries(){
    const data = await this.fetchContent(this.API_URL+"/trending/tv/day"+"?language=it-IT")
    // @ts-ignore
    return data.results
  }

  async getTvSeriesByID(id:number){
    return await this.fetchContent(this.API_URL + "/tv/+" + id + "?language=it-IT")
  }

  async getTvSeriesSeason(id:string, season:number){
    return await this.fetchContent(this.API_URL + "/tv/+" + id + "/season/" + season + "?language=it-IT")
  }



  async searchEverything(search : string){
    this.data = await this.fetchContent('https://api.themoviedb.org/3/search/multi?query='+search+'&include_adult=true&language=it-IT&page=1');
    console.log(this.data)
    return this.data.results
  }

}
