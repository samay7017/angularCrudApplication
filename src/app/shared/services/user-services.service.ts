import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from 'src/app/datatype';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  userDetails = new BehaviorSubject<UserDetails>(null);

  constructor(private http: HttpClient) {
    this.userDetails.next(JSON.parse(localStorage.getItem('userDetails'))) ;
  }

  getUserDetails(id: string) {
    return this.http.get<UserDetails>('https://angular-project-ce029-default-rtdb.firebaseio.com/Users/' + id + '.json').subscribe((user) => {
      this.userDetails.next(user);
      localStorage.setItem('userDetails' ,JSON.stringify(user));
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('userDetails');
    this.userDetails.next(null);
  }

}
