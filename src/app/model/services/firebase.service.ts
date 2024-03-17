import { Injectable } from '@angular/core';
import { Command } from '../interfaces/command';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Home } from '../interfaces/home';
import { Outro } from '../interfaces/outro';
import { Footer } from '../interfaces/footer';
import { ComandosEdit } from '../interfaces/comandos';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "Itens";
  private PATH2 : string = "Home";
  private PATH3 : string = "Comandos";
  private PATH4 : string = "Footer";
  private PATH5 : string = "Outro";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

    //comandos

    obterTodos() {
      return this.firestore.collection(this.PATH).snapshotChanges();
    }

    cadastrar(command: Command) {
      return this.firestore.collection(this.PATH).add({
        nome: command.nome,
        descricao: command.descricao,
        imgUrl: command.imgUrl,
        alt: command.alt,
        cooldown: command.cooldown,
      });
    }
    
    editar(command: Command, id: string) {
      return this.firestore.collection(this.PATH).doc(id).update({
        nome: command.nome,
        descricao: command.descricao,
        imgUrl: command.imgUrl,
        alt: command.alt,
        cooldown: command.cooldown,
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

    //comandos

    //home
    
    editarHome(home: Home, id: string) {
      return this.firestore.collection(this.PATH2).doc(id).update({
        title: home.title,
        description: home.description,
        bottext: home.bottext,
      });
    }

    obterTodosHome() {
      return this.firestore.collection(this.PATH2).snapshotChanges();
    }

    //home

    //comandos

    editarComandos(comandos: ComandosEdit, id: string) {
      return this.firestore.collection(this.PATH3).doc(id).update({
        title: comandos.title,
        description: comandos.description,
        search: comandos.search,
        placeholder: comandos.placeholder,
        lb: comandos.lb,
        rb: comandos.rb,
      });
    }

    obterTodosComandos() {
      return this.firestore.collection(this.PATH3).snapshotChanges();
    }

    //comandos

    //footer

    editarFooter(footer: Footer, id: string) {
      return this.firestore.collection(this.PATH4).doc(id).update({
        miniD: footer.miniD,
        rights: footer.rights,
        afiliated: footer.afiliated,
      });
    }

    obterTodosFooter() {
      return this.firestore.collection(this.PATH4).snapshotChanges();
    }

    //footer

    //outro

    editarOutro(outro: Outro, id: string) {
      return this.firestore.collection(this.PATH5).doc(id).update({
        botImg: outro.botImg,
        alt: outro.alt,
        link: outro.link
      });
    }
    
    uploadImageOutro(imagem: any, outro : Outro){
      const file = imagem.item(0);
      if(file.type.split('/')[0] !== 'image'){
        console.error("Tipo Não Suportado.");
        return;
      }
      const path = `images/${outro.alt}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path,file);
      task.snapshotChanges().pipe(
        finalize(() =>{
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe(resp => {
            outro.botImg = resp;
            {
              this.editarOutro(outro, outro.id);
            }
          })
        })
        ).subscribe();
      return task;
    }

    obterTodosOutro() {
      return this.firestore.collection(this.PATH5).snapshotChanges();
    }

    //outro
}