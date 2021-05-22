import { AddressModel } from "../address/address-model"

export class PurchaseModel {

    purchaseDate! : Date
    isFinished : boolean = false
    isPaid : boolean = false
    shippingAddress! : AddressModel
    billingAddress! : AddressModel
}
