import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {

  constructor(private router: Router,
    private authService: AuthService){

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  goBack(){
    this.router.navigate([''])
  }

  goToItens(){
    this.router.navigate(['itemlist']);
  }

  goToWebmanager(){
    this.router.navigate(['webmanager']);
  }
}
