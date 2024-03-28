import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Footer } from 'src/app/model/interfaces/footer';
import { Home } from 'src/app/model/interfaces/home';
import { Outro } from 'src/app/model/interfaces/outro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public homes: Home[] = [];
  public foots: Footer[] = [];
  public outros : Outro[] = [];

  constructor(private router: Router,
    private firebaseService: FirebaseService){
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

      this.firebaseService.obterTodosOutro().subscribe((res) => {
        this.outros = res.map((outro) => {
          return {
            id: outro.payload.doc.id,
            ...(outro.payload.doc.data() as any),
          } as Outro;
        });
      });
    }

    goToHome(){
      this.router.navigateByUrl("/");
    }
    
    goToCommands(){
      this.router.navigateByUrl("/comandos");
    }
}
