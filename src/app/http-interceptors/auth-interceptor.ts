import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        
        const user = this.userService.currentUser.value
        if(user.username == '') {
            return next.handle(req)
        }

        const clone = req.clone({
            setHeaders: {
                Authorization: this.generateAuthHeader('Basic',user.username, user.password)
              }
        })

        return next.handle(clone)
    }


    private generateAuthHeader(authType:string, username: string, password: string) {
        return `${authType} ${btoa(username + ':' + password)}`
    }
}
