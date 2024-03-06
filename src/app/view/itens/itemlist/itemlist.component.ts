import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent {
  public comandos: Command[] = [];

  constructor(private router: Router,
    private firebaseService: FirebaseService){
      this.firebaseService.obterTodos().subscribe((res) => {
        this.comandos = res.map((comando) => {
          return {
            id: comando.payload.doc.id,
            ...(comando.payload.doc.data() as any),
          } as Command;
        });
      });
  }

  editar(comando : Command){
    console.log('Item clicado:', comando);
    this.router.navigateByUrl("/itemedit", {state: { comando: comando } });
  }

  irParaCadastro(){
    this.router.navigate(["/itemcreate"]);
  }
}
