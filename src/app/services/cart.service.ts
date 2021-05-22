import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { OrderProductModel } from '../models/order/order-product-model';
import { ProductModel } from '../models/product/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartStorageKey = 'WATmerch-cart'

  orderProducts: BehaviorSubject<OrderProductModel[]> = new BehaviorSubject<OrderProductModel[]>([])

  constructor(private sanitizer : DomSanitizer) {

    let savedData = window.localStorage.getItem(this._cartStorageKey)
    if(savedData) {
      let savedProducts : OrderProductModel[] = JSON.parse(savedData)
      savedProducts.forEach( product => {
            let objectURL = 'data:image/jpeg;base64,' + product.image
            product.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL)
      })
      this.orderProducts.next(savedProducts)
    }
  }

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
    window.localStorage.setItem(this._cartStorageKey,JSON.stringify(tempProducts))
  }

  removeProduct(barcode : string) {
    let tempProducts = this.orderProducts.value.filter(product => product.barcode != barcode)
    this.orderProducts.next(tempProducts)
    window.localStorage.setItem(this._cartStorageKey,JSON.stringify(tempProducts))
  }

  addNewProductSet(orderProducts : OrderProductModel[]) {
    this.orderProducts.next(orderProducts)
    window.localStorage.setItem(this._cartStorageKey, JSON.stringify(orderProducts))
  }

  emptyCart() {
    this.orderProducts.next([])
    window.localStorage.setItem(this._cartStorageKey, JSON.stringify([]))
  }
}
