import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  showDescriptionFlag: boolean = false;

  public comandos: Command[] = [];
  public comandosLoaded = false;

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
