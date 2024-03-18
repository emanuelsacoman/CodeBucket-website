import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from 'src/app/model/interfaces/footer';
import { Home } from 'src/app/model/interfaces/home';
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
  public homes: Home[] = [];
  public foots: Footer[] = [];

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

      this.firebaseService.obterTodosHome().subscribe((res) => {
        this.homes = res.map((home) => {
          return {
            id: home.payload.doc.id,
            ...(home.payload.doc.data() as any),
          } as Home;
        });
      });

      this.firebaseService.obterTodosFooter().subscribe((res) => {
        this.foots = res.map((foot) => {
          return {
            id: foot.payload.doc.id,
            ...(foot.payload.doc.data() as any),
          } as Footer;
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

  goToCommands(){
    this.router.navigate(['commands']);
  }
}
