import { Injectable } from "@angular/core";
import { CanActivate  ,ActivatedRouteSnapshot,RouterStateSnapshot, Router, UrlTree} from "@angular/router";
import { map, Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{
    constructor(private authService :LoginService ,private router :Router){}
    canActivate(route:ActivatedRouteSnapshot ,router: RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean|UrlTree>{
        return this.authService.user.pipe(map((user)=>{
            const isAuth =!!user
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['']);
        }));
    }
}