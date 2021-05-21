import { CategoryModel } from "./category-model"
import { ProductBasicDetailsModel } from "./product-basic-details-model"
import { ProductDetailsModel } from "./product-details-model"

export class ProductModel {
    
    barcode! : string
    name! : string
    price! : number
    vat? : number
    category? : CategoryModel
    basicDetails? : ProductBasicDetailsModel
    details? : ProductDetailsModel
}
