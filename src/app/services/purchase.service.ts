import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressModel } from '../models/address/address-model';
import { OrderProductApiModel } from '../models/order/order-product-api-model';
import { OrderProductModel } from '../models/order/order-product-model';
import { PurchaseModel } from '../models/purchase/purchase-model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private _baseUrl = environment.serverUrl

  constructor(private http : HttpClient) { }

  sendPurchase(orderProducts : OrderProductModel[], shippingAddress: AddressModel, billingAddress: AddressModel) {

    let model = new PurchaseModel()
    model.shippingAddress = shippingAddress
    model.billingAddress = billingAddress
    model.purchaseDate = new Date()

    let orderProductsApi: OrderProductApiModel[] = []
    orderProducts.forEach(product=>{
      let orderProductApi = new OrderProductApiModel()
      orderProductApi.quantity = product.quantity
      orderProductApi.product = {barcode: product.barcode}
      orderProductsApi.push(orderProductApi)
    })

    model.orderProducts = orderProductsApi

    let url = this._baseUrl + '/api/buy'

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    console.log(JSON.stringify(model))
    console.log('kurwwwa!')

    return this.http.post(url,JSON.stringify(model),{headers: headers})
  }
}
