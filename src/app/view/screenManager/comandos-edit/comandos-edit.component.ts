import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComandosEdit } from 'src/app/model/interfaces/comandos';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-comandos-edit',
  templateUrl: './comandos-edit.component.html',
  styleUrls: ['./comandos-edit.component.css']
})
export class ComandosEditComponent {
  comandosEdit!: FormGroup;
  comando!: ComandosEdit;
  imagem: any;

  title! : string;
  description! : string;
  search!: string;
  placeholder!: string;
  lb!: string;
  rb!: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService){

  }

  ngOnInit(){
    this.comando = history.state.comando;
    console.log('Informações da home:', this.comando);

    this.title = this.comando?.title;
    this.description = this.comando?.description;
    this.search = this.comando?.search;
    this.placeholder = this.comando?.placeholder;
    this.lb = this.comando?.lb;
    this.rb = this.comando?.rb;

    this.comandosEdit = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      description: [this.description, [Validators.required]],
      search: [this.search, [Validators.required]],
      placeholder: [this.placeholder, [Validators.required]],
      lb: [this.lb, [Validators.required]],
      rb: [this.rb, [Validators.required]],
      imagem: [null],
      
    });
  }

  editItem() {
    if (this.comandosEdit.valid){
      const new_part: ComandosEdit = {...this.comandosEdit.value,id: this.comando.id, dropImg: this.comando.dropImg};
      if(this.imagem){
        this.firebase.uploadImageComandos(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/webmanager'])
        });
      }else{
        new_part.dropImg = this.comando.dropImg;
        
        this.firebase.editarComandos(new_part, this.comando.id).then(() => this.router.navigate(['/webmanager'])).catch((error) =>{
          console.log(error);
        });
      }
      }else{
      window.alert('Campos obrigatorios!');
    }
  }

  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  isInvalidControl(controlName: string) {
    const control = this.comandosEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
