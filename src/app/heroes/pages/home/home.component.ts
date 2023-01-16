import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  get user() {
    return this.authService.auth;
  }
  
  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {

  }

  logout() {
    this.router.navigate(['./auth'])
  }
}
