import { AddressModel } from "../address/address-model"
import { OrderProductExtendedModel } from "../order/order-product-api-model"


export class PurchaseExtendedModel {

    purchaseDate! : Date
    isFinished : boolean = false
    isPaid : boolean = false
    shippingAddress! : AddressModel
    billingAddress! : AddressModel
    orderProducts! : OrderProductExtendedModel[]
}
