import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from 'src/app/model/interfaces/home';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-web-manager',
  templateUrl: './web-manager.component.html',
  styleUrls: ['./web-manager.component.css']
})
export class WebManagerComponent {
  public homes: Home[] = [];

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
    }

  goToHomeEdit(home: Home){
    console.log('Item clicado:', home);
    this.router.navigateByUrl("/homeedit", {state: { home: home }});
  }
}
