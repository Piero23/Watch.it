import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TMDBDataService} from '../../../tmdbdata.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-suggested-movies',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './suggested-movies.component.html',
  styleUrl: './suggested-movies.component.css'
})
export class SuggestedMoviesComponent {
  trendingMoviesList : any
  mostLovedMoviesList : any

  constructor(private tmdbDataService :TMDBDataService) {}

  ngOnInit(): void {
    this.setTrendingMovies()
    this.setMostLovedMovies()
  }

  // Method to set a list with 8 of the trending movies
  async setTrendingMovies(){
    this.trendingMoviesList= await this.tmdbDataService.getTrendingMovies();
    this.trendingMoviesList = this.trendingMoviesList.slice(0,8)
    console.log(this.trendingMoviesList)
  }

  // Method to set a list with 8 of the most loved movies
  async setMostLovedMovies(){
    this.mostLovedMoviesList= await this.tmdbDataService.getMostLovedMovies();
    this.mostLovedMoviesList = this.mostLovedMoviesList.slice(0,8)
    console.log(this.mostLovedMoviesList)
  }
}
