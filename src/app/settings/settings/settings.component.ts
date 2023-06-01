import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AdminSettings } from 'src/app/datatype';
import { SettingService } from 'src/app/shared/services/setting.service';
import { UserServicesService } from 'src/app/shared/services/user-services.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentId:number;
  currentUser:string;
  constructor(private userService:UserServicesService ,private currentSettings:SettingService) { 
    this.currentSettings?.currentSettings.subscribe((res)=>{
      this.currentId=res?.settingId;
    });
    this.userService.userDetails.subscribe(res=>{
      this.currentUser=res?.name;
    })
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const newSettings:AdminSettings={
      settingId:this.currentId+1,
      settingDescription:{
        AllowEdit:form.value.edit==true?true:false,
        AllowMultipleDelete : form.value.mdelete==true?true:false,
        AllowProductCreate : form.value.create==true?true:false,
        AllowProductSearch : form.value.search==true?true:false
      },
      lastUpdatedBy:this.currentUser,
      lastUpdateTime:new Date()
    }
    this.currentSettings.updateSetting(newSettings);
  }

  onReset(){
    const newSettings:AdminSettings={
      settingId:this.currentId+1,
      settingDescription:{
        AllowEdit:true,
        AllowMultipleDelete :false,
        AllowProductCreate : true,
        AllowProductSearch : true
      },
      lastUpdatedBy:this.currentUser,
      lastUpdateTime:new Date()
    }
    this.currentSettings.updateSetting(newSettings);
  }

}
