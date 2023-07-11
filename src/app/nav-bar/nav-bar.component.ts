import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/api'


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ConfirmationService]
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;
  userId: string | null = null;
  sidebarVisible: boolean = false;

  constructor(private router: Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userFname = sessionStorage.getItem('user_fname');
    this.userLname = sessionStorage.getItem('user_lname');
    this.userId = sessionStorage.getItem('user_id');
    
  }

  logout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ต้องการออกจากระบบหรือไม่?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('user_fname');
        sessionStorage.removeItem('user_lname');
        sessionStorage.removeItem('user_id');
        this.router.navigate(['login']);
      },
      reject: () => {
          
      }
  });
         


  }
}
