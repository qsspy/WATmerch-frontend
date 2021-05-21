import { Byte } from "@angular/compiler/src/util"

export class ProductBasicDetailsModel {

    id! : number
    shortDescription! : string
    logoImage? : Byte[]
    discountPercent? : number

}
