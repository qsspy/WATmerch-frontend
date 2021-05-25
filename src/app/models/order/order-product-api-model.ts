import { ProductModel } from "../product/product-model"

export class OrderProductApiModel {

    quantity? : number
    product? : ProductBarcode
}

export class OrderProductExtendedModel {
    quantity? : number
    product? : ProductModel
}

export interface ProductBarcode {
    barcode : string
}
