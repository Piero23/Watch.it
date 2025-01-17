import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from '@angular/router';
import {TMDBDataService} from '../../../tmdbdata.service';

@Component({
  selector: 'app-suggested-series',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './suggested-series.component.html',
  styleUrl: './suggested-series.component.css'
})
export class SuggestedSeriesComponent {
  trendingSeriesList : any
  mostLovedSeriesList : any
  displayedTrendingSeries: any
  displayedMostLovedSeries: any
  currentTrendingIndex: number = 0;
  currentMostLovedIndex: number = 0;
  visibleCount: number = 8;
  constructor(private tmdbDataService :TMDBDataService) {}

  async ngOnInit() {
    await this.setTrendingSeries();
    await this.setMostLovedSeries();
    this.updateSeries('trending');
    this.updateSeries('mostLoved');
  }

  async setTrendingSeries() {
    this.trendingSeriesList = await this.tmdbDataService.getTrendingTvSeries();

    if (this.trendingSeriesList.length < this.visibleCount) {
      this.trendingSeriesList = [...this.trendingSeriesList, ...this.trendingSeriesList];
    }
  }

  async setMostLovedSeries(){
    this.mostLovedSeriesList = await this.tmdbDataService.getMostLovedTvSeries();

    if (this.mostLovedSeriesList.length < this.visibleCount) {
      this.mostLovedSeriesList = [...this.mostLovedSeriesList, ...this.mostLovedSeriesList];
    }
  }

  updateSeries(type: 'trending' | 'mostLoved') {
    if (type === 'trending') {
      const endTrendingIndex = this.currentTrendingIndex + this.visibleCount;
      this.displayedTrendingSeries = this.trendingSeriesList.slice(
        this.currentTrendingIndex,
        endTrendingIndex
      );

      if (endTrendingIndex > this.trendingSeriesList.length) {
        this.displayedTrendingSeries.push(
          ...this.trendingSeriesList.slice(0, endTrendingIndex - this.trendingSeriesList.length)
        );
      }
    }
    else if (type === 'mostLoved') {
      const endMostLovedIndex = this.currentMostLovedIndex + this.visibleCount;
      this.displayedMostLovedSeries = this.mostLovedSeriesList.slice(
        this.currentMostLovedIndex,
        endMostLovedIndex
      );
      if (endMostLovedIndex > this.mostLovedSeriesList.length) {
        this.displayedMostLovedSeries.push(
          ...this.trendingSeriesList.slice(0, endMostLovedIndex - this.mostLovedSeriesList.length)
        );
      }
    }
  }

  scrollContent(type: 'trending' | 'mostLoved', direction: 'next' | 'previous') {
    if (type === 'trending') {
      if (direction === 'next') {
        this.currentTrendingIndex =
          (this.currentTrendingIndex + 1) % this.trendingSeriesList.length;
      } else if (direction === 'previous') {
        this.currentTrendingIndex =
          (this.currentTrendingIndex - 1 + this.trendingSeriesList.length) %
          this.trendingSeriesList.length;
      }
      this.updateSeries('trending');
    } else if (type === 'mostLoved') {
      if (direction === 'next') {
        this.currentMostLovedIndex =
          (this.currentMostLovedIndex + 1) % this.mostLovedSeriesList.length;
      } else if (direction === 'previous') {
        this.currentMostLovedIndex =
          (this.currentMostLovedIndex - 1 + this.mostLovedSeriesList.length) %
          this.mostLovedSeriesList.length;
      }
      this.updateSeries('mostLoved');
    }
  }
}
