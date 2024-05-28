import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Footer } from 'src/app/model/interfaces/footer';
import { Home } from 'src/app/model/interfaces/home';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-footer-edit',
  templateUrl: './footer-edit.component.html',
  styleUrls: ['./footer-edit.component.css']
})
export class FooterEditComponent {
  footerEdit!: FormGroup;
  foot!: Footer;

  miniD!: string;
  rights!: string;
  afiliated!: string;
  homeRouter!: string;
  commandsRouter!: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.foot = history.state.foot;
    console.log('Informações da home:', this.foot);

    this.miniD = this.foot?.miniD;
    this.rights = this.foot?.rights;
    this.afiliated = this.foot?.afiliated;
    this.homeRouter = this.foot?.homeRouter;
    this.commandsRouter = this.foot?.commandsRouter;

    this.footerEdit = this.formBuilder.group({
      miniD: [this.miniD, [Validators.required]],
      rights: [this.rights, [Validators.required]],
      afiliated: [this.afiliated, [Validators.required]],
      homeRouter: [this.homeRouter, [Validators.required]],
      commandsRouter: [this.commandsRouter, [Validators.required]],
    });
  }

  editItem() {
    if (this.footerEdit.valid) {
        const new_part: Footer = {
            ...this.footerEdit.value,
            id: this.foot.id
        };

        this.firebase.editarFooter(new_part, this.foot.id)
            .then(() => {
                this.router.navigate(['/webmanager']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Atualização Concluída",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Error updating footer:', error);
                this.toast.error({
                    detail: "Erro",
                    summary: "Falha ao atualizar o rodapé.",
                    duration: 5000
                });
            });
    } else {
        this.toast.error({
            detail: "Erro",
            summary: "Campos obrigatórios!",
            duration: 5000
        });
    }
  }


  isInvalidControl(controlName: string) {
    const control = this.footerEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
