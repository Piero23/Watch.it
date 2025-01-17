import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DatabaseService} from '../../database.service';

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
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';


  database : DatabaseService = inject(DatabaseService);

  constructor(private router: Router) {}

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  switchToLogin() {
    this.router.navigate(['/login']);

  }

  async messageForm(username : string,email: string, password: string) {
    const data = await this.database.register(username,email,password);
    // @ts-ignore
    if(data.status === 200){
      this.showSuccess("Account registrato con successo")
      await this.router.navigate(['/']);

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

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }
}
