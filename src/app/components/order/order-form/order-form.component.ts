import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from 'src/app/models/address/address-model';
import { PurchaseModel } from 'src/app/models/purchase/purchase-model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.orderFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
      }),
      billingAddress: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
      })
    })
  }

  submitForm() {
    console.log('submit called')
  }

  isFormValid() {
    if (this.orderFormGroup.invalid) {
      this.orderFormGroup.markAllAsTouched()
      return false
    }

    return true
  }

  buildPurchaseModelFromForm() {
    let model = new PurchaseModel()
    model.purchaseDate = new Date()

    let shippingAddress = new AddressModel()
    shippingAddress.city = this.shippingCity?.value
    shippingAddress.country = this.shippingCountry?.value
    shippingAddress.firstName = this.shippingFirstName?.value
    shippingAddress.lastName = this.shippingLastName?.value
    shippingAddress.phoneNumber = this.shippingPhoneNumber?.value
    shippingAddress.postalCode = this.shippingPostalCode?.value

    let billingAddress = new AddressModel()
    billingAddress.city = this.billingCity?.value
    billingAddress.country = this.billingCountry?.value
    billingAddress.firstName = this.billingFirstName?.value
    billingAddress.lastName = this.billingLastName?.value
    billingAddress.phoneNumber = this.billingPhoneNumber?.value
    billingAddress.postalCode = this.billingPostalCode?.value

    model.shippingAddress = shippingAddress
    model.billingAddress = billingAddress

    console.log(model)
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
