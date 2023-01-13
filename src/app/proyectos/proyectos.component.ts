import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ProyectosService } from '../proyectos.service';
import { Proyecto } from './Proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  //Si se desea un sistema con varias personas/usuarios se podría crear una página de seleccion de personas a partir de dónde una vez seleccionada
  //la persona se almacena su id en el localstorage y se asigna a per_id al inicializarse el componente
  per_id = 1;

  listaProyectos: Proyecto[] = [];
  editMode = -1;
  addMode = false;

  form: FormGroup;
  formAdd: FormGroup;
  file: File;

  constructor(private proyectosService:ProyectosService, private authservice:AuthService, private formBuilder: FormBuilder, private router:Router){
    this.form= this.formBuilder.group({
      titulo:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      link:['', [Validators.required]]
    });

    this.formAdd= this.formBuilder.group({
      titulo:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      link:['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.getProyectos(this.per_id);
  }

  edit(id:number){
    this.editMode =id;
  }

  endEdit(id:number){
    this.editMode = -1;
  }

  public get logIn():boolean {
    return this.authservice.logIn;
  }

  public get getId():number{
    return this.authservice.getId;
  }
  
  getProyectos(per_id:number){
    this.proyectosService.getProyectos(per_id).subscribe(data => {this.listaProyectos=data.reverse()});
  }

  onEditar(id){
      var proyecto = new Proyecto(id,this.form.get('titulo')?.value, this.form.get('periodo')?.value,
      this.form.get('descripcion')?.value, this.form.get('link')?.value);
       
      this.proyectosService.editProyecto(this.per_id, proyecto).subscribe(data=>{this.getProyectos(this.per_id)},error=>{alert(error.message)});
      this.editMode = -1;
      

  }

  onEnviar(event){
      var proyecto = new Proyecto(-1,this.formAdd.get('titulo')?.value, this.formAdd.get('periodo')?.value,
      this.formAdd.get('descripcion')?.value, this.formAdd.get('link')?.value);

      this.proyectosService.addProyecto(this.per_id, proyecto).subscribe(data=>{this.getProyectos(this.per_id)},error=>{alert(error.message)});
      
  }

  onBorrar(id){
    this.proyectosService.deleteProyecto(this.per_id,id).subscribe(data=>{this.getProyectos(this.per_id)},error=>{alert(error.message)});
  }

  converterBase64ToImg(base64){
    var type:string;
    switch (base64.charAt(0)) {
      case '/':
        type = 'jpeg';
        break;
      case 'i':
        type = 'png';
        break;
      case 'R':
        type = 'gif';
        break;
      case 'U':
        return 'webp';
        break;
      case 'J':
        type = 'pdf';
        break;
      default:
        type = 'unknown';
        break;
    }
    return 'data:image/'+ type + ';base64,' + base64;
  }

}
