import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
  database : DatabaseService = inject(DatabaseService)

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  switchToRegister() {
    this.router.navigate(['/register']);
  }

  async messaggioForm(email: string, password: string) {
    const data = await this.database.logIn(email,password);
    // @ts-ignore
    if(data.status === 200){
      await this.router.navigate(['/']);

      // Aggiorna la pagina in automatico --Francesco
      window.location.reload();
    }
    else
      this.showError("Username o Mail già prensente nel sistema")
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }
}
