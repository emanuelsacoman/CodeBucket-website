import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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

  public isNavOpen: boolean = false;
  public outrosLoaded = false;

  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private toast: NgToastService){
      this.firebaseService.obterTodosOutro().subscribe((res) => {
        this.outros = res.map((outro) => {
          return {
            id: outro.payload.doc.id,
            ...(outro.payload.doc.data() as any),
          } as Outro;
        });
        this.outrosLoaded = true;
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

  logout(): void {
    const confirmLogout = window.confirm('Tem certeza de que deseja deslogar?');
    if (confirmLogout) {
        this.authService.deslogar()
            .then(() => {
                this.router.navigate(['/']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Desconectado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Error logging out:', error);
                this.toast.error({
                    detail: "Erro",
                    summary: "Falha ao desconectar.",
                    duration: 5000
                });
            });
    }
  }


  openNav() : void {
    this.isNavOpen = true;
  }

  closeNav() : void {
    this.isNavOpen = false;
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
    this.router.navigate(['comandos']);
  }
}
