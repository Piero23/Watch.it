import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {TMDBDataService} from '../tmdbdata.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  listaPopualrMovies : any


  constructor(private tmdbDataService :TMDBDataService) {}

  ngOnInit(): void {
    this.setPopularMovies()
  }


  async setPopularMovies(){
    this.listaPopualrMovies= await this.tmdbDataService.getPopularMovies();
    this.listaPopualrMovies = this.listaPopualrMovies.slice(0,8)

  }

}
