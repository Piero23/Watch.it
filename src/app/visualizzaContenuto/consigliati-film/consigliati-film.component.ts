import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TMDBDataService} from '../../tmdbdata.service';
import {ActivatedRoute, Route, Router, RouterLink} from '@angular/router';

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
    // Ascolta i cambiamenti nei parametri
    this.route.params.subscribe(async params => {
      const id = params['id']; // Ottieni il nuovo ID
      this.consigliati = await this.tmdbdata.getSimilarMovies(id); // Aggiorna i contenuti
      this.consigliati = this.consigliati.slice(0,9)
    });
  }


  routeTo(id:number){
    this.router.navigate(['/film/',id]);
  }
}
