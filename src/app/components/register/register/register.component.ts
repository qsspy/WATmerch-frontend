import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/models/address/address-model';
import { UserModel } from 'src/app/models/user/user-model';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _defaultSrc = 'assets/images/user.png'
  imageSrc: any
  submitDisabled = false

  registerForm! : FormGroup

  passwordsDoesntMatch = false
  usernameTaken = false
  emailTaken = false
  invalidFile = false

  constainsNoWhitespace(control: FormControl) {
    const isWhitespace = control.value.includes(' ')
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private router : Router) { 
    this.imageSrc = this._defaultSrc
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4), this.constainsNoWhitespace]],
      password: ['',[Validators.required, Validators.minLength(6), this.constainsNoWhitespace]],
      confirmPass: ['',[Validators.required, Validators.minLength(6), this.constainsNoWhitespace]],
      email: ['',[CustomValidators.email, Validators.required]],
      userDetails: this.formBuilder.group({
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        phoneNumber: ['',[CustomValidators.spacesOrDigits, Validators.required]],
        birthDate: ['',[Validators.required]],
        company: [''],
        nip: [''],
        avatar: ['']
      })
    })
  }

  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get passwordConfirm() {
    return this.registerForm.get('confirmPass')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get firstName() {
    return this.registerForm.get('userDetails.firstName')
  }

  get lastName() {
    return this.registerForm.get('userDetails.lastName')
  }

  get phoneNumber() {
    return this.registerForm.get('userDetails.phoneNumber')
  }

  get birthDate() {
    return this.registerForm.get('userDetails.birthDate')
  }

  get company() {
    return this.registerForm.get('userDetails.company')
  }

  get nip() {
    return this.registerForm.get('userDetails.nip')
  }

  get avatar() {
    return this.registerForm.get('userDetails.avatar')
  }

  onChange(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if(file.type != "image/png" && file.type != "image/jpeg") {
        this.invalidFile = true
        event.target.value = null
        this.imageSrc = this._defaultSrc
        return
      }

      this.invalidFile = false

      const reader = new FileReader();

      reader.addEventListener('load',event=>{
        this.imageSrc = event.target!.result
      })

      reader.readAsDataURL(file);
    } else {
      this.imageSrc = this._defaultSrc
    }
  }

  onSubmit(event : any) {

    this.passwordsDoesntMatch = this.password?.value != this.passwordConfirm?.value

    if(this.registerForm.invalid || this.passwordsDoesntMatch){
      this.registerForm.markAllAsTouched()
    } else {

      const model = this.buildModel()

      this.usernameTaken = false
      this.emailTaken = false
      this.submitDisabled = true
      this.userService.register(model).subscribe(
        () => {
          this.submitDisabled = false
          this.router.navigate(['/login'])
          Swal.fire({
            title: 'Rejestracja przebiegła pomyślnie, teraz możesz się zalogować!',
            icon: 'success'
          })
        },
        (error : HttpErrorResponse) => {
          const message : string = error.error.details
          if(message.includes('User')) {
            this.usernameTaken = true
          } else if(message.includes('E-mail')) {
            this.emailTaken = true
          } else {
            Swal.fire({
              title: 'Coś poszło nie tak :(',
              icon: 'error'
            })
          }
          this.submitDisabled = false
        }
      )
    }
  }

  private buildModel() : UserModel {
    
    const model = new UserModel()
    Object.assign(model,this.registerForm.value)

    if(model.userDetails.birthDate) {
      model.userDetails.birthDate = new Date(this.birthDate?.value.year, this.birthDate?.value.month, this.birthDate?.value.day)
    }

    model.shippingAddress = new AddressModel()
    model.billingAddress = new AddressModel()

    if(this.imageSrc != this._defaultSrc) {
      model.userDetails.avatar = this.imageSrc.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
    } else {
      model.userDetails.avatar = undefined
    }

    return model
  }
}
