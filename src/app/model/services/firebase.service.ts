import { Injectable } from '@angular/core';
import { Command } from '../interfaces/command';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Home } from '../interfaces/home';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "Itens";
  private PATH2 : string = "Home";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

    obterTodos() {
      return this.firestore.collection(this.PATH).snapshotChanges();
    }

    cadastrar(command: Command) {
      return this.firestore.collection(this.PATH).add({
        nome: command.nome,
        descricao: command.descricao,
        imgUrl: command.imgUrl,
        alt: command.alt
      });
    }
    
    editar(command: Command, id: string) {
      return this.firestore.collection(this.PATH).doc(id).update({
        nome: command.nome,
        descricao: command.descricao,
        imgUrl: command.imgUrl,
        alt: command.alt
      });
    }

    
    uploadImage(imagem: any, itens : Command){
      const file = imagem.item(0);
      if(file.type.split('/')[0] !== 'image'){
        console.error("Tipo Não Suportado.");
        return;
      }
      const path = `images/${itens.nome}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path,file);
      task.snapshotChanges().pipe(
        finalize(() =>{
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe(resp => {
            itens.imgUrl = resp;
            if(!itens.id){
              this.cadastrar(itens);
            }else {
              this.editar(itens, itens.id);
            }
          })
        })
        ).subscribe();
      return task;
    }
    
    excluir(id: string) {
      return this.firestore.collection(this.PATH).doc(id).delete();
    }  


    //home
    
    editarHome(home: Home, id: string) {
      return this.firestore.collection(this.PATH2).doc(id).update({
        title: home.title,
        description: home.description,
        botImg: home.botImg,
        alt: home.alt
      });
    }
    
    uploadImageHome(imagem: any, home : Home){
      const file = imagem.item(0);
      if(file.type.split('/')[0] !== 'image'){
        console.error("Tipo Não Suportado.");
        return;
      }
      const path = `images/${home.title}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path,file);
      task.snapshotChanges().pipe(
        finalize(() =>{
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe(resp => {
            home.botImg = resp;
            {
              this.editarHome(home, home.id);
            }
          })
        })
        ).subscribe();
      return task;
    }

    obterTodosHome() {
      return this.firestore.collection(this.PATH2).snapshotChanges();
    }
}