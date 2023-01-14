import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExperService } from '../exper.service';
import {AuthService} from '../auth.service';
import { Experiencia } from './Experiencia';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import {Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-exper',
  templateUrl: './exper.component.html',
  styleUrls: ['./exper.component.css']
})
export class ExperComponent implements OnInit{
  ExpList:Experiencia[] = [];
  expObs;

  form: FormGroup;
  formAdd: FormGroup;
  file: File;

  //Si se desea un sistema con varias personas/usuarios se podría crear una página de seleccion de personas a partir de dónde una vez seleccionada
  //la persona se almacena su id en el localstorage y se asigna a per_id al inicializarse el componente
  per_id = 1;
  editMode = -1;
  addMode = false;

  mySubscription;
  constructor(private expSer:ExperService, private authservice:AuthService, private formBuilder: FormBuilder, private router:Router){
    this.form= this.formBuilder.group({
      img:['', [Validators.required]],
      puesto:['', [Validators.required]],
      empresa:['', [Validators.required]],
      contacto:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]]
    });

    this.formAdd= this.formBuilder.group({
      img:['', [Validators.required]],
      puesto:['', [Validators.required]],
      empresa:['', [Validators.required]],
      contacto:['', [Validators.required]],
      periodo:['', [Validators.required]],
      descripcion:['', [Validators.required]]
    });
  }

  

  ngOnInit(){
    this.getExperiences(this.per_id);
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

  getExperiences(per_id:number){
    this.expSer.getExp(per_id).subscribe(data => {this.ExpList=data.reverse();});
  }

  onEditar(id){
      var experiencia = new Experiencia(id,'',this.form.get('puesto')?.value,
        this.form.get('empresa')?.value, this.form.get('contacto')?.value, this.form.get('periodo')?.value,this.form.get('descripcion')?.value);
      this.expSer.editExp(this.per_id,experiencia,this.file).subscribe(data=>{this.getExperiences(this.per_id)},error=>{alert(error.message)});
      this.editMode = -1;
      

  }

  onEnviar(event){
      var experiencia = new Experiencia(-1,'',this.formAdd.get('puesto')?.value,
        this.formAdd.get('empresa')?.value, this.formAdd.get('contacto')?.value, this.formAdd.get('periodo')?.value,this.formAdd.get('descripcion')?.value);

      this.expSer.addExp(this.per_id,experiencia,this.file).subscribe(data=>{this.getExperiences(this.per_id)},error=>{alert(error.message)});
      
  }

  onBorrar(id){
    this.expSer.deleteExp(this.per_id,id).subscribe(resp => {this.getExperiences(this.per_id)},error => {alert(error.message)});
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
