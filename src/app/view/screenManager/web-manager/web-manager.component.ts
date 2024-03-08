import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.obterTodosHome().subscribe((res) => {
        this.homes = res.map((home) => {
          return {
            id: home.payload.doc.id,
            ...(home.payload.doc.data() as any),
          } as Home;
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

  goToHomeEdit(home: Home){
    this.router.navigateByUrl("/homeedit", {state: { home: home }});
  }
  goToOutroEdit(outro: Outro){
    this.router.navigateByUrl("/outro", {state: {outro: outro}});
  }
}
