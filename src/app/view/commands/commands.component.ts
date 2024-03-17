import { Component } from '@angular/core';
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
  public comandosLoaded = false;
  public comandosLoaded2 = false;

  constructor(private router: Router,
    private firebaseService: FirebaseService){
      this.firebaseService.obterTodos().subscribe((res) => {
        this.comandos = res.map((comando) => {
          return {
            id: comando.payload.doc.id,
            ...(comando.payload.doc.data() as any),
          } as Command;
        });
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
    }

    showDescription(command: Command){
      this.comandos.forEach(item => {
        if(item.id === command.id){
          item.showDescriptionFlag = !item.showDescriptionFlag;
        } else {
          item.showDescriptionFlag = false;
        }
      });
    }

}
