import {Component, HostListener, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-preview-commenti',
  standalone: true,
  imports: [],
  templateUrl: './preview-commenti.html',
  styleUrl: './preview-commenti.css'
})
export class PreviewCommenti {


  router : Router = inject(Router)
  route : ActivatedRoute = inject(ActivatedRoute);

  @HostListener('click')
  onClick() {
    this.router.navigate([this.router.url,"comments"]);
  }
}
