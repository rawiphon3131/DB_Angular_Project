import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null; // Initialize with null or empty string, depending on your preference
  orDerl:any;
  wait:any;
  comp:any;
  user:any;
  constructor( private http:HttpClient) {}

  ngOnInit(): void {
    // Check if the session username is available
    this.username = sessionStorage.getItem('username');
    if (!this.username) {
      // Session username not available, redirect to the login page or perform any other action
      // Example: Redirect to the login page
      window.location.href = '/login';
    }
    this.loadOrderpre();
    this.loadOrderpreW();
    this.loadOrderpreC();
    this.loadUser();
    
  }
  
  loadUser() {
    this.http.get<any[]>('http://localhost/backend/total_cus_use.php')
      .subscribe(response => {
        this.user = response;
      });
  }
  loadOrderpreC() {
    this.http.get<any[]>('http://localhost/backend/total_preorder_wait_compleat.php')
      .subscribe(response => {
        this.comp = response;
      });
  }
  loadOrderpreW() {
    this.http.get<any[]>('http://localhost/backend/total_preorder_wait.php')
      .subscribe(response => {
        this.wait = response;
      });
  }
  loadOrderpre() {
    this.http.get<any[]>('http://localhost/backend/total_preorder.php')
      .subscribe(response => {
        this.orDerl = response;
      });
  }

}
