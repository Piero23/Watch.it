import {ProfileComponent} from './profile/profile.component';
import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {DatabaseService} from './database.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WatchedIt';
  searchQuery: any
  logged: boolean = false;
  username: string = ""
  dropdownOpen = false;
  notInLogIn: boolean = false;
  profilePic: any

  router: Router = inject(Router)
  database: DatabaseService = inject(DatabaseService)

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }


  clickOpening() {
    if (this.logged)
      this.toggleDropdown();
    else
      this.router.navigate(['login']);

  }

  logout(): void {
    this.database.logOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  onSearch() {
    this.router.navigate(['results'], {queryParams: {searchQuery: this.searchQuery}});
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
      this.logged = true;
      // @ts-ignore
      this.username = data.username

      const utente = await this.database.getUtente(this.username);

      // @ts-ignore
      if (utente.img_profilo) { // @ts-ignore
        this.profilePic = `data:image/png;base64,${utente.img_profilo}`;
      } else
        this.profilePic = "assets/images/Avatar.png"

    } else {
      this.username = "Login"
      this.profilePic = "assets/images/Avatar.png"
    }

  }
}
