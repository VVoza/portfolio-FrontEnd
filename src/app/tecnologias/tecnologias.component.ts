import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TecnologiasService } from '../tecnologias.service';
import { Tecnologia } from './Tecnologia';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css']
})
export class TecnologiasComponent implements OnInit{
  //Si se desea un sistema con varias personas/usuarios se podría crear una página de seleccion de personas a partir de dónde una vez seleccionada
  //la persona se almacena su id en el localstorage y se asigna a per_id al inicializarse el componente
  per_id = 1;

  listaTecnologias: Tecnologia[] = [];
  editMode = -1;
  addMode = false;

  form: FormGroup;
  formAdd: FormGroup;
  file: File;

  constructor(private tecnologiasService:TecnologiasService, private authservice:AuthService, private formBuilder: FormBuilder, private router:Router){
    this.form= this.formBuilder.group({
      nombre:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      maestria:['', [Validators.required]],
      tipo:['', [Validators.required]]
    });

    this.formAdd= this.formBuilder.group({
      nombre:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      maestria:['', [Validators.required]],
      tipo:['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.getTecnologias(this.per_id);
  }

  filtroLista(listaTecnologias, tipo): any[] {  
    return listaTecnologias.filter(tecnologia => tecnologia.tipo == tipo);
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
  
  getTecnologias(per_id:number){
    this.tecnologiasService.getTecnologias(per_id).subscribe(data=>{this.listaTecnologias=data;},error=>{error.message});
  }

  onEditar(id){
      var tecnologia = new Tecnologia(id,this.form.get('nombre')?.value, this.form.get('descripcion')?.value,
      this.form.get('maestria')?.value, this.form.get('tipo')?.value);
       
      this.tecnologiasService.editTecnologia(this.per_id, tecnologia).subscribe(data=>{this.getTecnologias(this.per_id)},error=>{alert(error.message)});
      this.editMode = -1;
      

  }

  onEnviar(event){
      var tecnologia = new Tecnologia(-1,this.formAdd.get('nombre')?.value, this.formAdd.get('descripcion')?.value,
      this.formAdd.get('maestria')?.value, this.formAdd.get('tipo')?.value);
      this.tecnologiasService.addTecnologia(this.per_id, tecnologia).subscribe(data=>{this.getTecnologias(this.per_id)},error=>{alert(error.message)});
      
  }

  onBorrar(id){
    this.tecnologiasService.deleteTecnologia(this.per_id,id).subscribe(data=>{this.getTecnologias(this.per_id)},error=>{alert(error.message)});
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
