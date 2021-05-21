import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderProductModel } from '../models/order/order-product-model';
import { ProductModel } from '../models/product/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderProducts: BehaviorSubject<OrderProductModel[]> = new BehaviorSubject<OrderProductModel[]>([])

  constructor() { }

  appendProduct(productModel: ProductModel, imageUrl: any, quantity: number) {

    let tempProducts = this.orderProducts.value

    let productWithSameBarcode = tempProducts.find((product: OrderProductModel) => productModel.barcode == product.barcode)

    if (productWithSameBarcode) {
      productWithSameBarcode.quantity += quantity
    } else {
      let orderProductModel = new OrderProductModel()
      orderProductModel.barcode = productModel.barcode
      if (productModel.basicDetails?.discountPercent) {
        orderProductModel.calculatedPrice = productModel.price - productModel.basicDetails.discountPercent * productModel.price
      } else {
        orderProductModel.calculatedPrice = productModel.price
      }
      orderProductModel.name = productModel.name
      orderProductModel.quantity = quantity
      orderProductModel.image = productModel.basicDetails?.logoImage!
      orderProductModel.imageUrl = imageUrl

      tempProducts.push(orderProductModel)
    }

    this.orderProducts.next(tempProducts)
  }
}
