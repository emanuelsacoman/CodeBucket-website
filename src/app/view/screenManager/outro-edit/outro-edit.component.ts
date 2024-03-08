import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Outro } from 'src/app/model/interfaces/outro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-outro-edit',
  templateUrl: './outro-edit.component.html',
  styleUrls: ['./outro-edit.component.css']
})
export class OutroEditComponent {
  outroEdit!: FormGroup;
  outro!: Outro;

  imagem: any;
  alt! : string;
  link! : string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService){

  }

  ngOnInit(){
    this.outro = history.state.outro;
    console.log('Informações da home:', this.outro);

    this.alt = this.outro?.alt;
    this.link = this.outro?.link;

    this.outroEdit = this.formBuilder.group({
      alt: [this.alt, [Validators.required]],
      link: [this.link, [Validators.required]],
      imagem: [null],
    });
  }

  editItem() {
    if (this.outroEdit.valid){
      const new_part: Outro = {...this.outroEdit.value,id: this.outro.id,botImg: this.outro.botImg};

      if (this.imagem) {
        this.firebase.uploadImageOutro(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/webmanager'])
        });
      }else{
        new_part.botImg = this.outro.botImg;

        this.firebase.editarOutro(new_part, this.outro.id).then(() => this.router.navigate(['/webmanager'])).catch((error) =>{
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
    const control = this.outroEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
