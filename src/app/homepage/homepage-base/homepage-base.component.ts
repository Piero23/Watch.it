import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {SuggestedMoviesComponent} from './suggested-movies/suggested-movies.component';
import {SuggestedSeriesComponent} from './suggested-series/suggested-series.component';

@Component({
  selector: 'app-homepage-base',
  standalone: true,
  imports: [
    NgIf,
    SuggestedMoviesComponent,
    SuggestedSeriesComponent,
    NgClass
  ],
  templateUrl: './homepage-base.component.html',
  styleUrl: './homepage-base.component.css'
})
export class HomepageBaseComponent implements OnInit {
  showMovies: boolean = true;

  ngOnInit(): void {
    this.setButtonStyles("movies", "series");
  }

  switchContent(index: number): void {
    if (index === 0) {
      this.showMovies = true;
      this.setButtonStyles("movies", "series");
    } else if (index === 1) {
      this.showMovies = false;
      this.setButtonStyles("series", "movies");
    }
  }

  private setButtonStyles(activeButtonId: string, inactiveButtonId: string): void {
    const activeButton = document.getElementById(activeButtonId);
    const inactiveButton = document.getElementById(inactiveButtonId);

    if (activeButton && inactiveButton) {
      activeButton.setAttribute("style", "background: #1BD75F; color: black;");
      inactiveButton.setAttribute("style", "background: #282828; color: lightgray;");
    }
  }
}
