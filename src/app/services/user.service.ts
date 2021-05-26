import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../http-interceptors/auth-interceptor';
import { AddressModel } from '../models/address/address-model';
import { UserCredsModel } from '../models/user-creds/user-creds-model';
import { UserDetailsModel } from '../models/user/user-details-model';
import { UserModel } from '../models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel())
  currentUserLogoUrl: BehaviorSubject<any> = new BehaviorSubject('assets/images/user.png')

  private basUrl = environment.serverUrl
  private _userStorageKey = "WATmerch_user"

  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {

    let storedUser = window.localStorage.getItem(this._userStorageKey)
    if (storedUser) {
      this.publishUser(JSON.parse(storedUser))
    }
  }

  login(username: string, password: string) {

    const url = this.basUrl + '/api/loginUser'

    const credsModel = new UserCredsModel()
    credsModel.password = password
    credsModel.username = username

    return this.http.post<UserModel>(url, JSON.stringify(credsModel), { headers: this.headers })
  }

  register(user: UserModel) {
    const url = this.basUrl + '/api/register'

    return this.http.post<UserModel>(url, JSON.stringify(user), { headers: this.headers })
  }

  logout() {
    this.currentUser.next(new UserModel())
    this.currentUserLogoUrl.next('assets/images/user.png')
    window.localStorage.removeItem(this._userStorageKey)
  }

  publishUser(user: UserModel) {
    this.currentUser.next(user)

    if (user.userDetails.avatar) {
      let objectURL = 'data:image/jpeg;base64,' + user.userDetails.avatar
      this.currentUserLogoUrl.next(this.sanitizer.bypassSecurityTrustUrl(objectURL))
    }
  }

  editUserDetails(details: UserDetailsModel) {
    const url = this.basUrl + '/api/editUserDetails'

    return this.http.put<UserDetailsModel>(url, JSON.stringify(details), { headers: this.headers })
  }

  editUserAddress(address : AddressModel, type : 'shipping' | 'billing') {

    const url = this.basUrl + '/api/editUserAddress/' + type

    return this.http.put<AddressModel>(url,JSON.stringify(address),{headers: this.headers})
  }

  saveCurrentUserInLocalStorage() {
    window.localStorage.setItem(this._userStorageKey, JSON.stringify(this.currentUser.value))
  }
}
