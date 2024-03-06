import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private firebase: FirebaseService){
      this.itemForm = this.formBuilder.group({
        nome: new FormControl(''),
        descricao: new FormControl(''),
        imagem: new FormControl(''),
        alt: new FormControl(''),
      });
      this.imagem = null;
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      alt: ['', [Validators.required]]
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
      const { nome, descricao, imagem, alt } = this.itemForm.value;
      const create: Command = new Command(nome, descricao, imagem, alt);

      if (imagem) {
        this.firebase.uploadImage(imagem, create)
          ?.then(() => {
            this.router.navigate(['/itemlist']);
          })
          .catch((error) => {
            console.log(error);
            window.alert('Erro ao salvar imagem');
          });
      } else {
        this.firebase.cadastrar(create)
          .then(() => {
            this.router.navigate(['/itemlist']);
          })
          .catch((error) => {
            console.log(error);
            window.alert('Erro');
          });
      }
    } else {
      window.alert('Preencha todos os campos');
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.itemForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  
}