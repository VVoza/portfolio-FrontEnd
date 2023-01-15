import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { EducacionService } from '../educacion-service.service';
import { Educacion } from './Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  //Si se desea un sistema con varias personas/usuarios se podría crear una página de seleccion de personas a partir de dónde una vez seleccionada
  //la persona se almacena su id en el localstorage y se asigna a per_id al inicializarse el componente
  per_id = 1;

  listaEducacion: Educacion[] = [];
  editMode = -1;
  addMode = false;

  form: FormGroup;
  formAdd: FormGroup;
  file: File;

  constructor(private educacionService:EducacionService, private authservice:AuthService, private formBuilder: FormBuilder, private router:Router){
    this.form= this.formBuilder.group({
      imagen:['', [Validators.required]],
      titulo:['', [Validators.required]],
      instituto:['', [Validators.required]],
      contacto:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]]
    });

    this.formAdd= this.formBuilder.group({
      imagen:['', [Validators.required]],
      titulo:['', [Validators.required]],
      instituto:['', [Validators.required]],
      contacto:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.getEducacion(this.per_id);
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

  fileChange(event){
    this.file = event.target.files[0];
  }

  getEducacion(per_id:number){
    this.educacionService.getEducacion(per_id).subscribe(data => {this.listaEducacion=data.reverse()});
  }

  onEditar(id){
      var educacion = new Educacion(id,'',this.form.get('titulo')?.value,
        this.form.get('instituto')?.value, this.form.get('contacto')?.value, this.form.get('periodo')?.value, this.form.get('descripcion')?.value);
       
      this.educacionService.editEducacion(this.per_id, educacion, this.file).subscribe(data=>{this.getEducacion(this.per_id)},error=>{alert(error.message)});
      this.editMode = -1;
      

  }

  onEnviar(event){
      var educacion = new Educacion(-1,'',this.formAdd.get('titulo')?.value,
        this.formAdd.get('instituto')?.value, this.formAdd.get('contacto')?.value, this.formAdd.get('periodo')?.value, this.formAdd.get('descripcion')?.value);

      this.educacionService.addEducacion(this.per_id, educacion,this.file).subscribe(data=>{this.getEducacion(this.per_id)},error=>{alert(error.message)});
      
  }

  onBorrar(id){
    this.educacionService.deleteEducacion(this.per_id,id).subscribe(data=>{this.getEducacion(this.per_id)},error=>{alert(error.message)});
  }

  converterBase64ToImg(base64){
    var type:string;
    if(base64!=undefined && base64!=null){
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
    }else{
      return "";
    }
  }

}
