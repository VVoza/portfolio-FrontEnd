import { Injectable } from '@angular/core';
import { Personas } from './about/Personas';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersService {
  per;
  constructor(private http: HttpClient, private router: Router) { }
  uri="https://portfolio-backend-kmed.onrender.com/personas/"
  addPersona(persona:Personas, perfil:File, banner:File){

    const formData: FormData = new FormData();
    formData.append('persona', new Blob([JSON.stringify(persona)], {type:'application/json'}));
    formData.append('perfil',perfil);
    formData.append('banner',banner);

    return this.http.post(this.uri + 'add', formData,{responseType: 'text'});
  }
  editPersona(persona:Personas, perfil:File, banner:File){

    const formData: FormData = new FormData();
    formData.append('persona', new Blob([JSON.stringify(persona)], {type:'application/json'}));
    formData.append('perfil', perfil);
    formData.append('banner', banner);
    return this.http.put(this.uri + 'edit/' + persona.id, formData,{responseType: 'text'});
  }
  public getPersona(per_id:number):Observable<Personas> {
    return this.http.get<Personas>(this.uri + 'find/' + per_id,{});
  }
}
