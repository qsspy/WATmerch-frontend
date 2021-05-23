import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imageSrc: string | ArrayBuffer = 'assets/images/user.png'

  registerForm! : FormGroup
  private _emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  private _spaceOrDigitPattern = /^(\d|\s)+$/

  passwordsDoesntMatch = false
  usernameTaken = false
  emailTaken = false
  invalidFile = false

  constainsNoWhitespace(control: FormControl) {
    const isWhitespace = control.value.includes(' ')
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4), this.constainsNoWhitespace]],
      password: ['',[Validators.required, Validators.minLength(6), this.constainsNoWhitespace]],
      passwordConfirm: ['',[Validators.required, Validators.minLength(6), this.constainsNoWhitespace]],
      email: ['',[Validators.pattern(this._emailPattern), Validators.required]],
      userDetails: this.formBuilder.group({
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        phoneNumber: ['',[Validators.pattern(this._spaceOrDigitPattern), Validators.required]],
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
    return this.registerForm.get('passwordConfirm')
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

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result!;

      reader.readAsDataURL(file);
    } else {
      this.imageSrc = 'assets/images/user.png'
    }
  }

  onSubmit(event : any) {

    this.passwordsDoesntMatch = this.password?.value != this.passwordConfirm?.value

    if(this.registerForm.invalid || this.passwordsDoesntMatch) {
      this.registerForm.markAllAsTouched()
    } else {

      Swal.fire({
        title: 'Fuck yea!',
        icon:'info'
      })
    }
  }

}
