import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  title = 'CodeBucket';

  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private titleService: Title){
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

      this.setDocTitle(this.title)
    }

    setDocTitle(title: string) {
      console.log('current title:::::' + this.titleService.getTitle());
      this.titleService.setTitle(title);
   }

    @HostListener('window:scroll', ['$event'])
onScroll(event: Event): void {
  const listaElementsRight = document.getElementsByClassName('examplePicRight');
  const listaElementsLeft = document.getElementsByClassName('examplePicLeft');
  
  // Itera sobre todos os elementos com a classe 'examplePicRight'
  for (let i = 0; i < listaElementsRight.length; i++) {
    const listaElementRight = listaElementsRight[i] as HTMLElement; 

    if (listaElementRight) {
      const distanciaDoTopo = listaElementRight.getBoundingClientRect().top;

      if (distanciaDoTopo < window.innerHeight - 0) {
        listaElementRight.classList.add('scroll-smoothRight');
      }
    }
  }

  // Itera sobre todos os elementos com a classe 'examplePicLeft'
  for (let i = 0; i < listaElementsLeft.length; i++) {
    const listaElementLeft = listaElementsLeft[i] as HTMLElement; 

    if (listaElementLeft) {
      const distanciaDoTopo = listaElementLeft.getBoundingClientRect().top;

      if (distanciaDoTopo < window.innerHeight - 0) {
        listaElementLeft.classList.add('scroll-smoothLeft');
      }
    }
  }
}



}
