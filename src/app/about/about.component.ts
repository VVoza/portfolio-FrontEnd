import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Personas } from '../about/Personas';
import { PersService } from '../pers.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  //Si se desea un sistema con varias personas/usuarios se podría crear una página de seleccion de personas a partir de dónde una vez seleccionada
  //la persona se almacena su id en el localstorage y se asigna a per_id al inicializarse el componente
  per_id = 1;
  editMode = false;
  persona:Personas = new Personas(0,'','','','',0,'','');
  form:FormGroup;
  perfil:File;
  banner:File;

  constructor(private personaService: PersService, private authservice:AuthService, private formBuilder: FormBuilder){
    this.form= this.formBuilder.group({
      nombre:['', [Validators.required]],
      apellido:['', [Validators.required]],
      perfil:['', [Validators.required]],
      banner:['', [Validators.required]],
      telefono:['', [Validators.required]],
      email:['', [Validators.required]],
      acercaDe:['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.getPersonas(this.per_id);
  }

  onChangePerfil(event){
    this.perfil = event.target.files[0];
  }

  onChangeBanner(event){
    this.banner = event.target.files[0];
  }

  getPersonas(per_id:number){
    this.personaService.getPersona(per_id).subscribe(data=>{this.persona=data},error => {alert(error.message);});
  }

  onEditar(event){
    var personaNueva = new Personas(this.per_id,this.form.get('nombre')?.value, this.form.get('apellido')?.value,'','',
    this.form.get('telefono')?.value, this.form.get('email')?.value, this.form.get('acercaDe')?.value);
    this.personaService.editPersona(personaNueva, this.perfil, this.banner).subscribe(data=>{this.getPersonas(this.per_id)},error=>{alert(error.message)})
  }

  public get logIn():boolean {
    return this.authservice.logIn;
  }

  public get getId():number{
    return this.authservice.getId;
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
