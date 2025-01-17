import {Component, OnInit} from '@angular/core';
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
export class SuggestedMoviesComponent implements OnInit {
  trendingMoviesList : any
  mostLovedMoviesList : any
  displayedTrendingMovies: any
  displayedMostLovedMovies: any
  currentTrendingIndex: number = 0;
  currentMostLovedIndex: number = 0;
  visibleCount: number = 8;
  constructor(private tmdbDataService :TMDBDataService) {}

  async ngOnInit() {
    await this.setTrendingMovies();
    await this.setMostLovedMovies();
    this.updateMovies('trending');
    this.updateMovies('mostLoved');
  }

  // Fetches the trending movies and sets the list
  async setTrendingMovies() {
    this.trendingMoviesList = await this.tmdbDataService.getTrendingMovies();

    if (this.trendingMoviesList.length < this.visibleCount) {
      this.trendingMoviesList = [...this.trendingMoviesList, ...this.trendingMoviesList];
    }
  }

  // Fetches the most loved movies and sets the list
  async setMostLovedMovies(){
    this.mostLovedMoviesList = await this.tmdbDataService.getMostLovedMovies();

    if (this.mostLovedMoviesList.length < this.visibleCount) {
      this.mostLovedMoviesList = [...this.mostLovedMoviesList, ...this.mostLovedMoviesList];
    }
  }

  // Updates the displayed movies based on the current start index
  updateMovies(type: 'trending' | 'mostLoved') {
    if (type === 'trending') {
      const endTrendingIndex = this.currentTrendingIndex + this.visibleCount;
      this.displayedTrendingMovies = this.trendingMoviesList.slice(
        this.currentTrendingIndex,
        endTrendingIndex
      );

      // Wraps around
      if (endTrendingIndex > this.trendingMoviesList.length) {
        this.displayedTrendingMovies.push(
          ...this.trendingMoviesList.slice(0, endTrendingIndex - this.trendingMoviesList.length)
        );
      }
    }
    else if (type === 'mostLoved') {
    const endMostLovedIndex = this.currentMostLovedIndex + this.visibleCount;
      this.displayedMostLovedMovies = this.mostLovedMoviesList.slice(
        this.currentMostLovedIndex,
          endMostLovedIndex
      );
      if (endMostLovedIndex > this.mostLovedMoviesList.length) {
        this.displayedMostLovedMovies.push(
          ...this.trendingMoviesList.slice(0, endMostLovedIndex - this.mostLovedMoviesList.length)
        );
      }
    }
  }

  // Scroll through content by updating the start index
  scrollContent(type: 'trending' | 'mostLoved', direction: 'next' | 'previous') {
    if (type === 'trending') {
      if (direction === 'next') {
        this.currentTrendingIndex =
          (this.currentTrendingIndex + 1) % this.trendingMoviesList.length;
      } else if (direction === 'previous') {
        this.currentTrendingIndex =
          (this.currentTrendingIndex - 1 + this.trendingMoviesList.length) %
          this.trendingMoviesList.length;
      }
      this.updateMovies('trending');
    } else if (type === 'mostLoved') {
      if (direction === 'next') {
        this.currentMostLovedIndex =
          (this.currentMostLovedIndex + 1) % this.mostLovedMoviesList.length;
      } else if (direction === 'previous') {
        this.currentMostLovedIndex =
          (this.currentMostLovedIndex - 1 + this.mostLovedMoviesList.length) %
          this.mostLovedMoviesList.length;
      }
      this.updateMovies('mostLoved');
    }
  }
}
