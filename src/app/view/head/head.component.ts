import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Outro } from 'src/app/model/interfaces/outro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  public outros : Outro[] = [];

  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService){
      this.firebaseService.obterTodosOutro().subscribe((res) => {
        this.outros = res.map((outro) => {
          return {
            id: outro.payload.doc.id,
            ...(outro.payload.doc.data() as any),
          } as Outro;
        });
      });

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
