import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
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
}
