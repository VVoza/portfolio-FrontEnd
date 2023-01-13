import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'http://localhost:8080/authenticate/';
  token;

  constructor(private http: HttpClient, private router: Router) { }
  
  login(usuario:string, contrasena: string){
    this.http.post(this.uri + 'login', {usuario:usuario,email:'' ,contrasena: contrasena},{responseType: 'text'})
    .subscribe((resp:any) => {
      if(eval(resp)!=-1){
        this.router.navigate(['']);
        localStorage.setItem('per_id', JSON.stringify(resp))
        localStorage.setItem('token', resp.token);
      }else{
        alert("Credenciales incorrectas");
      }
    }, error => alert(error.message) );
  }
  logout(){
    localStorage.removeItem('token');
  }
  public get logIn():boolean {
    return (localStorage.getItem('token') != null);
  }
  public get getId():number {
    return JSON.parse(localStorage.getItem('per_id') || '-1');
  }
}
