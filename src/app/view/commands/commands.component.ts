import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ComandosEdit } from 'src/app/model/interfaces/comandos';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  showDescriptionFlag: boolean = false;

  public comandos2: ComandosEdit[] = [];
  public comandos: Command[] = [];
  comandToShow: Command[] = [];
  public comandosLoaded = false;
  public comandosLoaded2 = false;

  searchTerm: string = '';

  title = 'CodeBucket | Comandos';
  description = 'Descubra todos os comando que CodeBucket apresenta.';

  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private titleService: Title,
    private metaService: Meta){
      this.firebaseService.obterTodos().subscribe((res) => {
        this.comandos = res.map((comando) => {
          return {
            id: comando.payload.doc.id,
            ...(comando.payload.doc.data() as any),
          } as Command;
        });
        this.comandToShow = this.comandos;
        this.comandosLoaded = true;
      });

      this.firebaseService.obterTodosComandos().subscribe((res) => {
        this.comandos2 = res.map((comando) => {
          return {
            id: comando.payload.doc.id,
            ...(comando.payload.doc.data() as any),
          } as ComandosEdit;
        });
        this.comandosLoaded2 = true;
      });

      this.setDocTitle(this.title);
      this.setMetaDescription(this.description);
    }

    setDocTitle(title: string) {
      console.log('current title:::::' + this.titleService.getTitle());
      this.titleService.setTitle(title);
    }

    setMetaDescription(description: string) {
      console.log('Updating meta description:::::', description);
      this.metaService.updateTag({ name: 'description', content: description });
    }

    showDescription(command: Command){
      this.comandos.forEach(item => {
        if(item.id === command.id){
          item.showDescriptionFlag = !item.showDescriptionFlag;
        }
      });
    }

    showAll() {
      this.comandos.forEach(item => {
        item.showDescriptionFlag = true; 
      });
    }
    
    hideAll() {
      this.comandos.forEach(item => {
        item.showDescriptionFlag = false;
      });
    }
    

    search(e: Event):void{
      const target = e.target as HTMLInputElement;
      const value = target.value.toLowerCase();
      this.comandToShow = this.comandos.filter(comando => {
        return comando.nome.toLowerCase().includes(value);
      })
    }

}
