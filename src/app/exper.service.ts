import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Experiencia } from './exper/Experiencia';

@Injectable({
  providedIn: 'root'
})



export class ExperService {

ExpList:Experiencia[];

constructor(private http: HttpClient, private router: Router) { }
  uri="http://localhost:8080/personas/"
  uriesp="/experiencia"
  addExp(per_id:number,experiencia:Experiencia, imagen:File){
    
    const formData: FormData = new FormData();
    formData.append('experiencia', new Blob([JSON.stringify(experiencia)], {type:'application/json'}));
    formData.append('imagen',imagen);

    return this.http.post(this.uri + per_id + this.uriesp +'/add', formData,{responseType: 'text'});
  }
  
  editExp(per_id:number, experiencia:Experiencia, imagen:File){

    const formData: FormData = new FormData();
    formData.append('experiencia', new Blob([JSON.stringify(experiencia)], {type:'application/json'}));
    formData.append('imagen',imagen);

    return this.http.put(this.uri + per_id + this.uriesp +'/edit/' + experiencia.id, formData,{responseType: 'text'});
    
  }

  deleteExp(per_id:number, id:number){
    return this.http.delete(this.uri + per_id + this.uriesp + '/delete/' + id,{responseType: 'text'});
  }

  public getExp(per_id:number):Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.uri + per_id + this.uriesp + '/getall',{});
    
  }
 
}
