import { Byte } from "@angular/compiler/src/util"

export class OrderProductModel {
    barcode! : string
    name! : string
    calculatedPrice! : number
    quantity! : number
    image! : Byte[]
}
