export class OrderProductApiModel {

    quantity? : number
    product? : ProductBarcode
}

export interface ProductBarcode {
    barcode : string
}
