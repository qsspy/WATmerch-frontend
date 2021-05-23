import { AddressModel } from "../address/address-model"
import { OrderProductApiModel } from "../order/order-product-api-model"

export class PurchaseModel {

    purchaseDate! : Date
    isFinished : boolean = false
    isPaid : boolean = false
    shippingAddress! : AddressModel
    billingAddress! : AddressModel
    orderProducts! : OrderProductApiModel[]
}
