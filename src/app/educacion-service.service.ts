import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Educacion } from './educacion/Educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http: HttpClient, private router: Router) { }
  uri="https://portfolio-backend-kmed.onrender.com/personas/";
  uriesp="/educacion";

  addEducacion(per_id:number,educacion:Educacion, imagen:File){
    
    const formData: FormData = new FormData();
    formData.append('educacion', new Blob([JSON.stringify(educacion)], {type:'application/json'}));
    formData.append('imagen',imagen);

    return this.http.post(this.uri + per_id + this.uriesp +'/add', formData,{responseType: 'text'});
  }
  
  editEducacion(per_id:number, educacion:Educacion, imagen:File){

    const formData: FormData = new FormData();
    formData.append('educacion', new Blob([JSON.stringify(educacion)], {type:'application/json'}));
    formData.append('imagen',imagen);

    return this.http.put(this.uri + per_id + this.uriesp +'/edit/' + educacion.id, formData,{responseType: 'text'});
    
  }

  deleteEducacion(per_id:number, id:number){
    return this.http.delete(this.uri + per_id + this.uriesp + '/delete/' + id,{responseType: 'text'});
  }

  public getEducacion(per_id:number):Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.uri + per_id + this.uriesp + '/getall',{});
  }
}
