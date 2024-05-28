import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Command } from 'src/app/model/interfaces/command';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-itemcreate',
  templateUrl: './itemcreate.component.html',
  styleUrls: ['./itemcreate.component.css']
})
export class ItemcreateComponent {
  itemForm: FormGroup;
  imagem: FileList | null;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){
      this.itemForm = this.formBuilder.group({
        nome: new FormControl(''),
        descricao: new FormControl(''),
        imagem: new FormControl(''),
        alt: new FormControl(''),
        cooldown: new FormControl(''),
      });
      this.imagem = null;
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      alt: ['', [Validators.required]],
      cooldown: ['', [Validators.required]],
    })
  }

  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      const imagem = target.files;
      this.itemForm.patchValue({ imagem: imagem });
      this.imagem = imagem;
    }
  } 

  cadastro() {
    if (this.itemForm.valid) {
        const { nome, descricao, imagem, alt, cooldown } = this.itemForm.value;
        const create: Command = new Command(nome, descricao, imagem, alt, cooldown);

        const navigateAndToastSuccess = () => {
            this.router.navigate(['/itemlist']);
            this.toast.success({
                detail: "Sucesso!",
                summary: "Item cadastrado com sucesso.",
                duration: 5000
            });
        };

        if (imagem) {
            this.firebase.uploadImage(imagem, create)
                ?.then(navigateAndToastSuccess)
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao salvar imagem.",
                        duration: 5000
                    });
                });
        } else {
            this.firebase.cadastrar(create)
                .then(navigateAndToastSuccess)
                .catch((error) => {
                    console.error('Error registering item:', error);
                    this.toast.error({
                        detail: "Erro",
                        summary: "Falha ao cadastrar o item.",
                        duration: 5000
                    });
                });
        }
    } else {
        this.toast.error({
            detail: "Erro",
            summary: "Preencha todos os campos!",
            duration: 5000
        });
    }
  }


  isInvalidControl(controlName: string) {
    const control = this.itemForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  
}