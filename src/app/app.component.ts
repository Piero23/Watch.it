
import {ProfileComponent} from './profile/profile.component';
import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet, RouterLink, NavigationEnd} from '@angular/router';
import {BannerInfoContentComponent} from './visualizzaContenuto/banner-info-content/banner-info-content.component';
import {SchermataContenutiComponent} from './visualizzaContenuto/schermata-contenuti/schermata-contenuti.component';
import {ListaEpisodiComponent} from './visualizzaContenuto/SerieTv/lista-episodi/lista-episodi.component';
import {ListaRicercaComponent} from './ricerca/lista-ricerca/lista-ricerca.component';
import {FormsModule} from '@angular/forms';
import {CommentItemComponent} from './commenti-contenuto/comment-item/comment-item.component';
import {CommentSectionComponent} from './commenti-contenuto/comment-section/comment-section.component';
import { routes } from './app.routes';
import {HomepageComponent} from './homepage/homepage.component';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {DatabaseService} from './database.service';
import {LoginComponent} from './login-register/login/login.component';
import { RegisterComponent} from './login-register/register/register.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerInfoContentComponent, SchermataContenutiComponent, ListaEpisodiComponent, ListaRicercaComponent, FormsModule, ProfileComponent, RouterLink, RegisterComponent, LoginComponent, CommentItemComponent, CommentSectionComponent, RouterOutlet, HomepageComponent, NgOptimizedImage, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WatchedIt';
  searchQuery : any
  logged : boolean = false;
  username: string = ""
  dropdownOpen = false;
  notInLogIn : boolean = false;

  router : Router = inject(Router)
  database : DatabaseService = inject(DatabaseService)

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    // Perform logout logic here
    this.database.logOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();  // This will refresh the page
    });
  }

  onSearch() {
    this.router.navigate(['results'], { queryParams: { searchQuery: this.searchQuery } });
  }

  async ngOnInit() {

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.notInLogIn = !['/login', '/register'].includes(currentUrl);
      });

    const data = await this.database.utenteBySession();

    // @ts-ignore
    if (data.status === 200) {
      this.logged  = true;
      //this.router.navigate(['/']);

      // @ts-ignore
      this.username = data.username
    }else
      this.username = "Login"
    console.log(this.logged)

  }

  routerLog(){
    if(this.logged )
      this.router.navigate(['profile']);
    else
      this.router.navigate(['login']);
  }
}
