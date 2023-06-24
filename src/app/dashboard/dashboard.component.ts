import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null; // Initialize with null or empty string, depending on your preference

  constructor() {}

  ngOnInit(): void {
    // Check if the session username is available
    this.username = sessionStorage.getItem('username');
    if (!this.username) {
      // Session username not available, redirect to the login page or perform any other action
      // Example: Redirect to the login page
      window.location.href = '/login';
    }
  }
}
