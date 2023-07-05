import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;
  userId: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userFname = sessionStorage.getItem('user_fname');
    this.userLname = sessionStorage.getItem('user_lname');
    this.userId = sessionStorage.getItem('user_id');

  }

  logout(): void {
    Swal.fire({
      icon: 'warning',
      title: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',

      text: 'ต้องการออกจากระบบแน่นอนใช่หรือไม่',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'ออกจากระบบสำเร็จ'

        }).then(() => {
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('user_fname');
          sessionStorage.removeItem('user_lname');
          sessionStorage.removeItem('user_id');
          location.reload();
        });
      }

    });


  }
}
