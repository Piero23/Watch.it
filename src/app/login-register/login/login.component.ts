import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

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

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  switchToRegister() {
    this.router.navigate(['/register']);
  }

  messaggioForm(email: string, password: string) {
    if (email === "admin@admin.com") {
      this.showError('La combinazione di utente e password non è corretta.');
    } else if (email === "" || password === "") {
      this.showError('Completa tutti i campi e riprova.');
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }
}
