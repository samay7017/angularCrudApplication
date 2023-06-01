import { Component, Input, OnInit } from '@angular/core';
import { AdminSettings, UserDetails } from 'src/app/datatype';
import { SettingService } from '../../services/setting.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {
@Input() sideNavStatus:boolean=false;
userDetails:UserDetails;
settings:AdminSettings;
  constructor( private userService :UserServicesService , private settingService:SettingService) { }

  ngOnInit(): void {
    this.userService.userDetails.subscribe((res)=>{
      this.userDetails=res;
      this.settingService.currentSettings.subscribe((res)=>{
        this.settings=res;
      });
    });
  }

}
