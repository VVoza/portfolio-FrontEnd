import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from './proyectos/Proyecto';
@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient, private router: Router) { }

   uri="http://localhost:8080/personas/";
  uriesp="/proyectos";

  addProyecto(per_id:number,proyecto:Proyecto){
    
    const formData: FormData = new FormData();
    formData.append('proyecto', new Blob([JSON.stringify(proyecto)], {type:'application/json'}));

    return this.http.post(this.uri + per_id + this.uriesp +'/add', formData,{responseType: 'text'});
  }
  
  editProyecto(per_id:number, proyecto:Proyecto){

    const formData: FormData = new FormData();
    formData.append('proyecto', new Blob([JSON.stringify(proyecto)], {type:'application/json'}));

    return this.http.put(this.uri + per_id + this.uriesp +'/edit/' + proyecto.id, formData,{responseType: 'text'});
    
  }

  deleteProyecto(per_id:number, id:number){
    return this.http.delete(this.uri + per_id + this.uriesp + '/delete/' + id,{responseType: 'text'});
  }

  public getProyectos(per_id:number):Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.uri + per_id + this.uriesp + '/getall',{});
  }
}
