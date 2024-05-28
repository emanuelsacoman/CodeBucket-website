import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
    private firebase: FirebaseService,
    private toast: NgToastService){

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
    if (this.outroEdit.valid) {
        const new_part: Outro = {
            ...this.outroEdit.value,
            id: this.outro.id,
            botImg: this.outro.botImg
        };

        const navigateAndToastSuccess = () => {
            this.router.navigate(['/webmanager']);
            this.toast.success({
                detail: "Sucesso!",
                summary: "Atualização Concluída",
                duration: 5000
            });
        };

        if (this.imagem) {
            this.firebase.uploadImageOutro(this.imagem, new_part)
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
            new_part.botImg = this.outro.botImg;

            this.firebase.editarOutro(new_part, this.outro.id)
                .then(navigateAndToastSuccess)
                .catch((error) => {
                    console.error('Error updating outro:', error);
                    this.toast.error({
                        detail: "Erro",
                        summary: "Falha ao atualizar.",
                        duration: 5000
                    });
                });
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
    const control = this.outroEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
