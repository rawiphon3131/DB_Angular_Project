import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    // Check if the user is logged in
    return sessionStorage.getItem('user_id') !== null;
  }
}
