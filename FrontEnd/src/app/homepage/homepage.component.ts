import {Component} from '@angular/core';
import {HomepageBaseComponent} from './homepage-base/homepage-base.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HomepageBaseComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {}
