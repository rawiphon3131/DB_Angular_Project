import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'user' && this.password === '1234') {
      this.message = 'Login successful!';
      this.router.navigate(['/dashboard']);
    } else {
      this.message = 'รหัสผิดจ้า';
    }
    this.resetForm();
  }

  resetForm() {
    this.username = '';
    this.password = '';
  }
}
