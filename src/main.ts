import { bootstrapApplication } from '@angular/platform-browser';
import { LoginRegisterComponent } from './app/login-register/login-register.component';

bootstrapApplication(LoginRegisterComponent)
  .catch((err) => console.error(err));
