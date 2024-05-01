import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';
import { User } from 'src/app/model/interfaces/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  loginError: string | null = null;

  title = 'Faça login.';
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titleService: Title){
      this.setDocTitle(this.title)
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      senha: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
    });
  }

  submit(){
    const user: User = this.userForm.value;

    if (!user) {
        return;
    }

    this.authService.login(user).then(() =>
        this.router.navigate(['']))
        .catch((e: any) => {
          this.loginError = 'Email ou senha incorretos.';
          this.userForm.reset()
        });
  }

  isInvalidControl(controlName: string) {
    const control = this.userForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }
}