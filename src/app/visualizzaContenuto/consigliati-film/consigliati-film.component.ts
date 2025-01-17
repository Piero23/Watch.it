import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TMDBDataService} from '../../tmdbdata.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-consigliati-film',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './consigliati-film.component.html',
  styleUrl: './consigliati-film.component.css'
})
export class ConsigliatiFilmComponent implements OnInit{
  consigliati: any

  tmdbdata : TMDBDataService = inject(TMDBDataService);
  route : ActivatedRoute = inject(ActivatedRoute)
  router : Router = inject(Router)

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      this.consigliati = await this.tmdbdata.getSimilarMovies(id);
      this.consigliati = this.consigliati.slice(0,9)
    });
  }


}
