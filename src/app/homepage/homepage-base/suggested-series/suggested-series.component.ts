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

  constructor(private tmdbDataService :TMDBDataService) {}

  ngOnInit(): void {
    this.setTrendingSeries()
    this.setMostLovedSeries()
  }

  // Method to set a list with 8 of the trending tv series
  async setTrendingSeries(){
    this.trendingSeriesList= await this.tmdbDataService.getTrendingTvSeries();
    this.trendingSeriesList = this.trendingSeriesList.slice(0,8)
    console.log(this.trendingSeriesList)
  }

  // Method to set a list with 8 most of the loved tv series
  async setMostLovedSeries(){
    this.mostLovedSeriesList= await this.tmdbDataService.getMostLovedTvSeries();
    this.mostLovedSeriesList = this.mostLovedSeriesList.slice(0,8)
    console.log(this.mostLovedSeriesList)
  }
}
