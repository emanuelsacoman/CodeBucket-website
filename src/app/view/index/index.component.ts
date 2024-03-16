import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/app/model/interfaces/command';
import { Home } from 'src/app/model/interfaces/home';
import { Outro } from 'src/app/model/interfaces/outro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public comandos: Command[] = [];
  public homes: Home[] = [];
  public outros : Outro[] = [];
  public comandosLoaded = false;
  public homesLoaded = false;
  public outrosLoaded = false;

  constructor(private router: Router,
    private firebaseService: FirebaseService){
      this.firebaseService.obterTodos().subscribe((res) => {
        this.comandos = res.map((comando) => {
          return {
            id: comando.payload.doc.id,
            ...(comando.payload.doc.data() as any),
          } as Command;
        });
        this.comandos = this.comandos.filter(item => item.nome !== 'Invite');
        this.comandos = this.comandos.filter(item => item.nome !== 'Servercount');
        this.comandosLoaded = true;
      });

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

      
    }
}
