import { Component } from '@angular/core';
import {HomepageFiltersComponent} from '../homepage-filters/homepage-filters.component';
import {HomepageComponent} from '../homepage.component';

@Component({
  selector: 'app-homepage-base',
  standalone: true,
  imports: [
    HomepageFiltersComponent,
    HomepageComponent
  ],
  templateUrl: './homepage-base.component.html',
  styleUrl: './homepage-base.component.css'
})
export class HomepageBaseComponent {

}
