import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from 'src/app/models/address/address-model';
import { UserModel } from 'src/app/models/user/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderFormGroup!: FormGroup

  constainsNoWhitespace(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService) { }

  ngOnInit(): void {

    this.orderFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        lastName: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        street: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        city: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        country: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.pattern(/^\S.*\S$/)])
      }),
      billingAddress: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        lastName: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        street: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        city: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        country: new FormControl('', [Validators.required, Validators.pattern(/^\S.*\S$/)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.pattern(/^\S.*\S$/)])
      })
    })

    this.userService.currentUser.subscribe((data : UserModel)=>{
      if(data.username != '') {
        this.copyUsetDataToForm(data)
      }
    })
  }

  isFormValid() {
    if (this.orderFormGroup.invalid) {
      this.orderFormGroup.markAllAsTouched()
      return false
    }

    return true
  }

  get billingAddress(): AddressModel {

    let billingAddress = new AddressModel()
    billingAddress.city = this.billingCity?.value
    billingAddress.country = this.billingCountry?.value
    billingAddress.firstName = this.billingFirstName?.value
    billingAddress.street = this.billingStreet?.value
    billingAddress.lastName = this.billingLastName?.value
    billingAddress.phoneNumber = this.billingPhoneNumber?.value
    billingAddress.postalCode = this.billingPostalCode?.value

    return billingAddress
  }

  get shippingAddress(): AddressModel {

    let shippingAddress = new AddressModel()
    shippingAddress.city = this.shippingCity?.value
    shippingAddress.country = this.shippingCountry?.value
    shippingAddress.firstName = this.shippingFirstName?.value
    shippingAddress.street = this.shippingStreet?.value
    shippingAddress.lastName = this.shippingLastName?.value
    shippingAddress.phoneNumber = this.shippingPhoneNumber?.value
    shippingAddress.postalCode = this.shippingPostalCode?.value

    return shippingAddress
  }

  copyShippingToBilling(event: any) {
    if (event.target.checked) {

      this.billingCity?.setValue(this.shippingCity?.value)
      this.billingCountry?.setValue(this.shippingCountry?.value)
      this.billingStreet?.setValue(this.shippingStreet?.value)
      this.billingFirstName?.setValue(this.shippingFirstName?.value)
      this.billingLastName?.setValue(this.shippingLastName?.value)
      this.billingPhoneNumber?.setValue(this.shippingPhoneNumber?.value)
      this.billingPostalCode?.setValue(this.shippingPostalCode?.value)
    }
  }

  private copyUsetDataToForm(user : UserModel) {
    const shipping = user.shippingAddress
    const billing = user.billingAddress

      this.billingCity?.setValue(billing.city)
      this.billingCountry?.setValue(billing.country)
      this.billingStreet?.setValue(billing.street)
      this.billingFirstName?.setValue(billing.firstName)
      this.billingLastName?.setValue(billing.lastName)
      this.billingPhoneNumber?.setValue(billing.phoneNumber)
      this.billingPostalCode?.setValue(billing.postalCode)

      this.shippingCity?.setValue(shipping.city)
      this.shippingCountry?.setValue(shipping.country)
      this.shippingStreet?.setValue(shipping.street)
      this.shippingFirstName?.setValue(shipping.firstName)
      this.shippingLastName?.setValue(shipping.lastName)
      this.shippingPhoneNumber?.setValue(shipping.phoneNumber)
      this.shippingPostalCode?.setValue(shipping.postalCode)
  }

  get shippingFirstName() {
    return this.orderFormGroup.get('shippingAddress.firstName')
  }

  get shippingLastName() {
    return this.orderFormGroup.get('shippingAddress.lastName')
  }

  get shippingStreet() {
    return this.orderFormGroup.get('shippingAddress.street')
  }

  get shippingPostalCode() {
    return this.orderFormGroup.get('shippingAddress.postalCode')
  }

  get shippingCity() {
    return this.orderFormGroup.get('shippingAddress.city')
  }

  get shippingCountry() {
    return this.orderFormGroup.get('shippingAddress.country')
  }

  get shippingPhoneNumber() {
    return this.orderFormGroup.get('shippingAddress.phoneNumber')
  }

  get billingFirstName() {
    return this.orderFormGroup.get('billingAddress.firstName')
  }

  get billingLastName() {
    return this.orderFormGroup.get('billingAddress.lastName')
  }

  get billingStreet() {
    return this.orderFormGroup.get('billingAddress.street')
  }

  get billingPostalCode() {
    return this.orderFormGroup.get('billingAddress.postalCode')
  }

  get billingCity() {
    return this.orderFormGroup.get('billingAddress.city')
  }

  get billingCountry() {
    return this.orderFormGroup.get('billingAddress.country')
  }

  get billingPhoneNumber() {
    return this.orderFormGroup.get('billingAddress.phoneNumber')
  }
}
