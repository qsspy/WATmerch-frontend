import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from 'src/app/models/address/address-model';
import { UserDetailsModel } from 'src/app/models/user/user-details-model';
import { UserModel } from 'src/app/models/user/user-model';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-data-panel',
  templateUrl: './user-data-panel.component.html',
  styleUrls: ['./user-data-panel.component.css']
})
export class UserDataPanelComponent implements OnInit {

  @ViewChild('avatar') avatar! : ElementRef

  private _defaultSrc = 'assets/images/user.png'
  buttonsDisabled = false
  user?: UserModel
  userAvatar?: any
  
  invalidFile = false

  detailsForm?: FormGroup
  shippingAddressForm?: FormGroup
  billingAddressForm?: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.detailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['',[Validators.required, CustomValidators.spacesOrDigits]],
      birthDate: ['',[Validators.required]],
      company: [''],
      nip: ['']
    })

    this.shippingAddressForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, CustomValidators.spacesOrDigits]]
    })

    this.billingAddressForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, CustomValidators.spacesOrDigits]]
    })

    this.userService.currentUser.subscribe((user: UserModel) => {
      if (user.username != '') {
        this.user = user
        const details = this.user.userDetails

        if (typeof this.user.userDetails.birthDate === 'string') {
          this.user.userDetails.birthDate = new Date(this.user.userDetails.birthDate)
        }

        this.setUserCurrentDetails(details);
        this.setUserCurrentShippingAddress(this.user.shippingAddress)
        this.setUserCurrentBillingAddress(this.user.billingAddress)
      }
    })

    this.userService.currentUserLogoUrl.subscribe(data => {
      this.userAvatar = data
    })
  }

  private setUserCurrentDetails(details: UserDetailsModel) {
    this.firstName?.setValue(details.firstName);
    this.lastName?.setValue(details.lastName);
    this.phoneNumber?.setValue(details.phoneNumber);
    this.birthDate?.setValue({
      year: details.birthDate?.getFullYear(),
      month: details.birthDate?.getMonth(),
      day: details.birthDate?.getDate()
    });
    this.company?.setValue(details.company);
    this.nip?.setValue(details.nip);
  }

  private setUserCurrentShippingAddress(address : AddressModel) {
    this.shippingCity?.setValue(address.city)
    this.shippingCountry?.setValue(address.country)
    this.shippingFirstName?.setValue(address.firstName)
    this.shippingLastName?.setValue(address.lastName)
    this.shippingPhoneNumber?.setValue(address.phoneNumber)
    this.shippingStreet?.setValue(address.street)
    this.shippingPostalCode?.setValue(address.postalCode)
  }

  private setUserCurrentBillingAddress(address : AddressModel) {
    this.billingCity?.setValue(address.city)
    this.billingCountry?.setValue(address.country)
    this.billingFirstName?.setValue(address.firstName)
    this.billingLastName?.setValue(address.lastName)
    this.billingPhoneNumber?.setValue(address.phoneNumber)
    this.billingStreet?.setValue(address.street)
    this.billingPostalCode?.setValue(address.postalCode)
  }

  onDetailsSubmit() {

    if(this.detailsForm?.invalid) {
      this.detailsForm.markAllAsTouched()
    } else {
      this.buttonsDisabled = true
      this.userService.editUserDetails(this.buildDetailsModel()).subscribe(
        (data : UserDetailsModel)=>{

          this.user!.userDetails = data
          this.userService.publishUser(this.user!)
          this.userService.saveCurrentUserInLocalStorage()

          Swal.fire({
            title: "Dane pomyślnie edytowano!",
            icon: 'success'
          })
          this.buttonsDisabled = false
        },
        (error : HttpErrorResponse)=>{
          Swal.fire({
            title: "Nieoczekiwany błąd :/",
            icon: 'error'
          })
          this.buttonsDisabled = false
        })
    }
  }

  onShippingAddressSubmit() {
    if(this.shippingAddressForm?.invalid) {
      this.shippingAddressForm.markAllAsTouched()
    } else {
      this.buttonsDisabled = true
      this.userService.editUserAddress(this.buildAddressModel('shipping'),'shipping').subscribe(
        (data : AddressModel)=>{
          
          this.user!.shippingAddress=data
          this.userService.publishUser(this.user!)
          this.userService.saveCurrentUserInLocalStorage()
          
          Swal.fire({
            title: "Dane pomyślnie edytowano!",
            icon: 'success'
          })
          this.buttonsDisabled = false
        },
        (error : HttpErrorResponse)=> {
          Swal.fire({
            title: "Nieoczekiwany błąd :/",
            icon: 'error'
          })
          this.buttonsDisabled = false
        }
      )
    }
  }

  onBillingAddressSubmit() {
    if(this.billingAddressForm?.invalid) {
      this.billingAddressForm.markAllAsTouched()
    } else {
      this.buttonsDisabled = true
      this.userService.editUserAddress(this.buildAddressModel('billing'),'billing').subscribe(
        (data : AddressModel)=>{
          this.user!.billingAddress = data
          this.userService.publishUser(this.user!)
          this.userService.saveCurrentUserInLocalStorage()
          
          Swal.fire({
            title: "Dane pomyślnie edytowano!",
            icon: 'success'
          })
          this.buttonsDisabled = false
        },
        (error : HttpErrorResponse)=> {
          Swal.fire({
            title: "Nieoczekiwany błąd :/",
            icon: 'error'
          })
          this.buttonsDisabled = false
        }
      )
    }
  }

  onImageChange(event : any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if(file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/jpg") {
        this.invalidFile = true
        event.target.value = null
        this.userAvatar = this._defaultSrc
        return
      }

      this.invalidFile = false

      const reader = new FileReader();

      reader.addEventListener('load',event=>{
        this.userAvatar = event.target!.result
      })

      reader.readAsDataURL(file);
    } else {
      this.userAvatar = this._defaultSrc
    }
  }

  private buildDetailsModel() : UserDetailsModel {
    
    const model = new UserDetailsModel()
    model.firstName = this.firstName?.value
    model.lastName = this.lastName?.value
    model.company = this.company?.value
    model.nip = this.company?.value
    model.birthDate = new Date(this.birthDate?.value.year, this.birthDate?.value.month, this.birthDate?.value.day)
    model.phoneNumber = this.phoneNumber?.value

    if(this.userAvatar != this._defaultSrc) {
      if(this.userAvatar.changingThisBreaksApplicationSecurity) {
        model.avatar = this.userAvatar.changingThisBreaksApplicationSecurity.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
      }
      else {
        model.avatar = this.userAvatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
      }
    } else {
      model.avatar = undefined
    }

    return model
  }

  private buildAddressModel(type : 'shipping' | 'billing') {
    
    const model = new AddressModel()

    if(type === 'shipping') {
      Object.assign(model, this.shippingAddressForm?.value)
    } else {
      Object.assign(model, this.billingAddressForm?.value)
    }

    return model
  }

  get firstName() {
    return this.detailsForm?.get('firstName')
  }

  get lastName() {
    return this.detailsForm?.get('lastName')
  }

  get phoneNumber() {
    return this.detailsForm?.get('phoneNumber')
  }

  get birthDate() {
    return this.detailsForm?.get('birthDate')
  }

  get company() {
    return this.detailsForm?.get('company')
  }

  get nip() {
    return this.detailsForm?.get('nip')
  }

  get shippingFirstName() {
    return this.shippingAddressForm?.get('firstName')
  }

  get shippingLastName() {
    return this.shippingAddressForm?.get('lastName')
  }

  get shippingStreet() {
    return this.shippingAddressForm?.get('street')
  }

  get shippingPostalCode() {
    return this.shippingAddressForm?.get('postalCode')
  }

  get shippingCity() {
    return this.shippingAddressForm?.get('city')
  }

  get shippingCountry() {
    return this.shippingAddressForm?.get('country')
  }

  get shippingPhoneNumber() {
    return this.shippingAddressForm?.get('phoneNumber')
  }

  get billingFirstName() {
    return this.billingAddressForm?.get('firstName')
  }

  get billingLastName() {
    return this.billingAddressForm?.get('lastName')
  }

  get billingStreet() {
    return this.billingAddressForm?.get('street')
  }

  get billingPostalCode() {
    return this.billingAddressForm?.get('postalCode')
  }

  get billingCity() {
    return this.billingAddressForm?.get('city')
  }

  get billingCountry() {
    return this.billingAddressForm?.get('country')
  }

  get billingPhoneNumber() {
    return this.billingAddressForm?.get('phoneNumber')
  }
}
