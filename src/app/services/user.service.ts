import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../http-interceptors/auth-interceptor';
import { UserCredsModel } from '../models/user-creds/user-creds-model';
import { UserModel } from '../models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel())
  currentUserLogoUrl : BehaviorSubject<any> = new BehaviorSubject('assets/images/user.png')

  private basUrl = environment.serverUrl
  private _userStorageKey = "WATmerch_user"

  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http : HttpClient,
    private sanitizer : DomSanitizer) {

    let storedUser = window.localStorage.getItem(this._userStorageKey)
    if(storedUser) {
      this.publishUser(JSON.parse(storedUser))
    }
  }

  login(username: string, password: string) {

    const url = this.basUrl + '/api/loginUser'

    const credsModel = new UserCredsModel()
    credsModel.password = password
    credsModel.username = username

    return this.http.post<UserModel>(url, JSON.stringify(credsModel), {headers: this.headers})
  }

  logout () {
    this.currentUser.next(new UserModel())
    this.currentUserLogoUrl.next('assets/images/user.png')
    window.localStorage.removeItem(this._userStorageKey)
  }

  publishUser(user : UserModel) {
    this.currentUser.next(user)

    if(user.userDetails.avatar) {
      let objectURL = 'data:image/jpeg;base64,' + user.userDetails.avatar
      this.currentUserLogoUrl.next(this.sanitizer.bypassSecurityTrustUrl(objectURL))
    }
  }

  saveCurrentUserInLocalStorage() {
    window.localStorage.setItem(this._userStorageKey,JSON.stringify(this.currentUser.value))
  }
}
