import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'modmed-assignment-2';
  sideNavStatus:boolean;
  constructor(private authService:LoginService){}
  ngOnInit(){
    this.authService.autoLogin();
  }
}
