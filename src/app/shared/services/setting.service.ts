import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminSettings } from 'src/app/datatype';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  currentSettings= new BehaviorSubject<AdminSettings>(null);

  constructor(private http:HttpClient) { 
      this.currentSettings.next(JSON.parse(localStorage.getItem('currentSettings')));
      
  }

  updateSetting(settings:AdminSettings):void{
    this.http.put('https://angular-project-ce029-default-rtdb.firebaseio.com/Settings.json',settings).subscribe((res)=>{console.log(res)});
  }

  getSetting():void{
    this.http.get<AdminSettings>('https://angular-project-ce029-default-rtdb.firebaseio.com/Settings.json').subscribe((res)=>{
      this.currentSettings.next(res);
      localStorage.setItem('currentSettings', JSON.stringify(res));
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('currentSettings');
  }
}
