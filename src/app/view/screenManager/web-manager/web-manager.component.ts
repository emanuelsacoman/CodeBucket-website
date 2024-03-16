import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from 'src/app/model/interfaces/footer';
import { Home } from 'src/app/model/interfaces/home';
import { Outro } from 'src/app/model/interfaces/outro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-web-manager',
  templateUrl: './web-manager.component.html',
  styleUrls: ['./web-manager.component.css']
})
export class WebManagerComponent {
  public homes: Home[] = [];
  public outros: Outro[] = [];
  public foots: Footer[] = [];

  public homesLoaded = false;
  public outrosLoaded = false;
  public footsLoaded = false;
  public comandosLoaded = false;

  constructor(private router: Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.obterTodosHome().subscribe((res) => {
        this.homes = res.map((home) => {
          return {
            id: home.payload.doc.id,
            ...(home.payload.doc.data() as any),
          } as Home;
        });
        this.homesLoaded = true;
      });

      this.firebaseService.obterTodosOutro().subscribe((res) => {
        this.outros = res.map((outro) => {
          return {
            id: outro.payload.doc.id,
            ...(outro.payload.doc.data() as any),
          } as Outro;
        });
        this.outrosLoaded = true;
      });

      this.firebaseService.obterTodosFooter().subscribe((res) => {
        this.foots = res.map((foot) => {
          return {
            id: foot.payload.doc.id,
            ...(foot.payload.doc.data() as any),
          } as Footer;
        });
        this.footsLoaded = true;
      });

      
    }

  goToHomeEdit(home: Home){
    this.router.navigateByUrl("/homeedit", {state: { home: home }});
  }

  goToOutroEdit(outro: Outro){
    this.router.navigateByUrl("/outro", {state: {outro: outro}});
  }

  goToFooterEdit(foot: Footer){
    this.router.navigateByUrl("/footer", {state: {foot: foot}});
  }

  goToComandosEdit(){
    this.router.navigateByUrl("/comandosedit");
  }
}
