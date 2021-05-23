import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  invalidUsername = false
  invalidPassword = false
  loading = false

  private _notWhitespaces = /\S*/

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router : Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(event: any) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {

      this.disableLogin(event.target)

      this.invalidUsername = false
      this.invalidPassword = false
      this.userService.login(this.username?.value, this.password?.value).subscribe(
        (data: UserModel) => {
          this.userService.publishUser(data)
          this.userService.saveCurrentUserInLocalStorage()
          this.enableLogin(event.target)
          this.router.navigate(['/home'])
        },
        (error: HttpErrorResponse) => {
          let message: string = error.error.details
          if (message.includes('not found')) this.invalidUsername = true
          else if (message.includes('password')) this.invalidPassword = true
          this.enableLogin(event.target)
        },
      )
    }
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

  private enableLogin(button : any) {
      this.loading = false
      button.disabled = false
  }

  private disableLogin(button : any) {
    this.loading = true
    button.disabled = true
  }
}
