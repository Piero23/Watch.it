import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatabaseService} from '../database.service';

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

  database : DatabaseService = inject(DatabaseService);

  toggleView() {
    this.isLogin = !this.isLogin;
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async messageForm(email: string, password: string) {
    console.log(await this.database.logIn("ads", "adsa"))
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
