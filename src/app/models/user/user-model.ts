import { AddressModel } from "../address/address-model"
import { UserDetailsModel } from "./user-details-model"

export class UserModel {

    username = ''
    password = ''
    email = ''
    enabled = true
    shippingAddress! : AddressModel
    billingAddress! : AddressModel
    userDetails! : UserDetailsModel
}
