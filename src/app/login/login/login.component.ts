import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { UserServicesService } from 'src/app/shared/services/user-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enableLoader: boolean = false;

  constructor(private authService: LoginService, private router: Router, private userService: UserServicesService, private settingService: SettingService) { }
  isLoginMode = true;
  isAdmin: boolean;
  error: string = "";
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.username;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.enableLoader = true;
      this.authService.login(email, password).subscribe((res) => {
        this.userService.getUserDetails(res.localId);
        this.settingService.getSetting();
        this.userService.userDetails.subscribe((res)=> 
          {
              if(res?.isAdmin){
                this.router.navigate(['/admin-settings']);
              }
              else{
                this.router.navigate(['/list-of-products']);
              }
              this.enableLoader = false;
          }
        );
       
      },
        errorMessage => {
          this.error = errorMessage;
          this.enableLoader = false;
        }
      );
    }
    form.reset();
  }
}
