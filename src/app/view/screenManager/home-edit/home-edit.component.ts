import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Home } from 'src/app/model/interfaces/home';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.css']
})
export class HomeEditComponent {
  homeEdit!: FormGroup;
  home!: Home;
  imagem: any;

  title! : string;
  description! : string;
  alt! : string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService){

  }

  ngOnInit(){
    this.home = history.state.home;
    console.log('Informações da home:', this.home);

    this.title = this.home?.title;
    this.description = this.home?.description;
    this.alt = this.home?.alt;

    this.homeEdit = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      description: [this.description, [Validators.required]],
      alt: [this.alt, [Validators.required]],
      imagem: [null],
    });
  }

  editItem() {
    if (this.homeEdit.valid){
      const new_part: Home = {...this.homeEdit.value,id: this.home.id,botImg: this.home.botImg};

      if (this.imagem) {
        this.firebase.uploadImageHome(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/webmanager'])
        });
      }else{
        new_part.botImg = this.home.botImg;

        this.firebase.editarHome(new_part, this.home.id).then(() => this.router.navigate(['/webmanager'])).catch((error) =>{
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
    const control = this.homeEdit.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
