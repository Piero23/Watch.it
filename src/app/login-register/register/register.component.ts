import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isPasswordVisible: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  switchToLogin() {
    this.router.navigate(['/login']);
  }

  messageForm(email: string, password: string) {
    if (email === "admin@admin.com") {
      this.showError('Esiste già un account associato a questa mail.');
    } else {
      this.showSuccess('Account creato con successo!');
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
