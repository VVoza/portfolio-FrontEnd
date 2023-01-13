import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tecnologia } from './tecnologias/Tecnologia';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasService {
  
  constructor(private http: HttpClient, private router: Router) { }

   uri="http://localhost:8080/personas/";
  uriesp="/tecnologias";

  addTecnologia(per_id:number,tecnologia:Tecnologia){
    
    const formData: FormData = new FormData();
    formData.append('tecnologia', new Blob([JSON.stringify(tecnologia)], {type:'application/json'}));

    return this.http.post(this.uri + per_id + this.uriesp +'/add', formData,{responseType: 'text'});
  }
  
  editTecnologia(per_id:number, tecnologia:Tecnologia){

    const formData: FormData = new FormData();
    formData.append('tecnologia', new Blob([JSON.stringify(tecnologia)], {type:'application/json'}));

    return this.http.put(this.uri + per_id + this.uriesp +'/edit/' + tecnologia.id, formData,{responseType: 'text'});
    
  }

  deleteTecnologia(per_id:number, id:number){
    return this.http.delete(this.uri + per_id + this.uriesp + '/delete/' + id,{responseType: 'text'});
  }

  public getTecnologias(per_id:number):Observable<Tecnologia[]> {
    return this.http.get<Tecnologia[]>(this.uri + per_id + this.uriesp + '/getall',{});
  }
}
