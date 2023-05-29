import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userFname = sessionStorage.getItem('user_fname');
    this.userLname = sessionStorage.getItem('user_lname');

  }

  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_fname');
    sessionStorage.removeItem('user_lname');
    this.router.navigate(['/login']);
  }
}
