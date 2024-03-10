import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService){

  }

  ngOnInit(){
    this.foot = history.state.foot;
    console.log('Informações da home:', this.foot);

    this.miniD = this.foot?.miniD;
    this.rights = this.foot?.rights;
    this.afiliated = this.foot?.afiliated;

    this.footerEdit = this.formBuilder.group({
      miniD: [this.miniD, [Validators.required]],
      rights: [this.rights, [Validators.required]],
      afiliated: [this.afiliated, [Validators.required]]
    });
  }

  editItem() {
    if (this.footerEdit.valid){
      const new_part: Footer = {...this.footerEdit.value,id: this.foot.id};
        this.firebase.editarFooter(new_part, this.foot.id).then(() => this.router.navigate(['/webmanager'])).catch((error) =>{
          console.log(error);
        });
      }else{
      window.alert('Campos obrigatorios!');
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.footerEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
