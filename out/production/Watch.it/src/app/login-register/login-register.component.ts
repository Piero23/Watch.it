import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  isLogin: boolean = true;
  isPasswordVisible: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  toggleView() {
    this.isLogin = !this.isLogin;
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  messageForm(email: string, password: string) {
    if (this.isLogin) {
      if (email === "admin@admin.com" && password === "1234") {
        this.showError('La combinazione di utente e password non è corretta.');
      } else if (email === "" || password === "") {
        this.showError('Completa tutti i campi e riprova.');
      }
    } else {
      if (email === "admin@admin.com" && password === "1234") {
        this.showError('Esiste già un account associato a questa mail.');
      } else {
        this.showSuccess('Account creato con successo!');
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }
}
