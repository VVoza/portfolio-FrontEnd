import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private authservice : AuthService, private router:Router){}

  collapsed = true;
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }

  public get logIn():boolean{
    return this.authservice.logIn;
  }
  public logOut(){
    this.authservice.logout();
  }

  public get checkLogin():boolean{
    return this.router.url === '/login';
  }
}
