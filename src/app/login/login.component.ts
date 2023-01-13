import {AuthService} from '../auth.service';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  email = '';
  password = '';
  constructor(private formBuilder: FormBuilder, private authservice: AuthService){
    this.form= this.formBuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  public get logIn():boolean {
    return this.authservice.logIn;
  }

  Login(){
    this.authservice.login(this.email, this.password);
  }

  ngOnInit(){
  }

  get Mail(){
   return this.form.get("email");
  }
  get Password(){
    return this.form.get("password");
  }

  get MailValid() {
    return false;
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  onEnviar(event: Event){
    event.preventDefault; 
    if (this.form.valid){
      if(this.Password!=null&&this.Mail!=null){
        this.email = this.Mail.value;
        this.password = this.Password.value;
        this.Login();
      }
    }else{   
      this.form.markAllAsTouched(); 
    }
 
  }

  deLog(){
    this.authservice.logout();
  }

}
