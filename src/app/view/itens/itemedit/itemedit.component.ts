import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-itemedit',
  templateUrl: './itemedit.component.html',
  styleUrls: ['./itemedit.component.css']
})
export class ItemeditComponent implements OnInit{
  editar!: FormGroup;
  comando!: Command;
  imagem: any;

  nome! : string;
  descricao! : string;
  alt! : string;
  cooldown! : string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.comando = history.state.comando;
    console.log('Informações do comando:', this.comando);

    this.nome = this.comando?.nome;
    this.descricao = this.comando?.descricao;
    this.alt = this.comando?.alt;
    this.cooldown = this.comando?.cooldown;

    this.editar = this.formBuilder.group({
      nome: [this.nome, [Validators.required]],
      descricao: [this.descricao, [Validators.required]],
      alt: [this.alt, [Validators.required]],
      cooldown: [this.cooldown, [Validators.required]],
      imagem: [null],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: Command = {
            ...this.editar.value,
            id: this.comando.id,
            imgUrl: this.comando.imgUrl
        };

        const navigateAndToastSuccess = () => {
            this.router.navigate(['/itemlist']);
            this.toast.success({
                detail: "Sucesso!",
                summary: "Atualização Concluída.",
                duration: 5000
            });
        };

        if (this.imagem) {
            this.firebase.uploadImage(this.imagem, new_part)
                ?.then(navigateAndToastSuccess)
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    this.toast.error({
                        detail: "Erro",
                        summary: "Falha ao atualizar imagem.",
                        duration: 5000
                    });
                });
        } else {
            new_part.imgUrl = this.comando.imgUrl;

            this.firebase.editar(new_part, this.comando.id)
                .then(navigateAndToastSuccess);
        }
    } else {
        this.toast.error({
            detail: "Erro",
            summary: "Campos obrigatórios!",
            duration: 5000
        });
    }
  }


  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  delete() {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este item?');
    if (confirmDelete) {
        this.firebase.excluir(this.comando.id)
            .then(() => {
                this.router.navigate(['/itemlist']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Item excluído com sucesso.",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao excluir o item. Tente novamente mais tarde.",
                    duration: 5000
                });
            });
    }
  }

}
