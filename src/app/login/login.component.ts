import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Initialize with an empty string
  password: string = ''; // Initialize with an empty string
  loginMessage: string = ''; // Initialize the login message

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(): void {
    const url = 'http://localhost/backend/login.php';

    const data = { username: this.username, password: this.password };
  
    // Make the HTTP request to the PHP server
    this.http.post(url, data).subscribe(
      (response: any) => {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('user_fname', response.user_fname);
        sessionStorage.setItem('user_lname', response.user_lname);
        console.log(response); // You can customize the actions here 
        // Redirect to the dashboard
        sessionStorage.setItem('username', this.username); // Store the username in session storage
        this.router.navigate(['/dashboard']);
      
      },
      (error) => {
        // Handle login error

          this.loginMessage = 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด'; // Set the login message

        
      }
    );
  }
}
