import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductModel } from '../models/product/product-model';

@Injectable({
   providedIn: 'root'
})
export class ProductService {

   private baseUrl: string
   keyword: string = ""
   activeCategoryId : number = 0

   shopProductsSubject : Subject<ProductModel[]> = new Subject<ProductModel[]>()

   constructor(private http: HttpClient) {
      this.baseUrl = environment.serverUrl
   }

   getRandomProducts(count?: number, detailed?: boolean, extended?: boolean) {

      let url = this.baseUrl + "/api/products/randomProducts?"
      if (count != null) url += `count=${count}&`
      if (detailed != null) url += `detailed=${detailed}&`
      if (extended != null) url += `extended=${extended}&`

      return this.http.get<ProductModel[]>(url)
   }

   getProducts(params?: GetProductsParams) {

      console.log('Im getting data')

      let url = this.baseUrl + '/api/products?'

      if (params) {
         if (params.page != null) url += `page=${params.page}&`
         if (params.size != null) url += `size=${params.size}&`
         if (params.category != null && params.category != 0) url += `category=${params.category}&`
         if (params.extended != null) url += `extended=${params.extended}&`
         if (params.detailed != null) url += `detailed=${params.detailed}&`
         if (params.contains != null) {
            params.contains = params.contains.trim()
            if (params.contains != "") url += `contains=${params.contains}&`
         }
      }
      this.http.get<ProductPage>(url).subscribe((data : ProductPage) => {
         this.shopProductsSubject.next(data.content)
      })
   }

   getShopProducts(size : number, page: number) {
      this.getProducts({extended: true, page:page, size:size,
                        category:this.activeCategoryId, contains: this.keyword})
   }

   getProduct(id : number) {
      
   }
}

export interface GetProductsParams {
   page?: number,
   size?: number,
   category?: number,
   extended?: boolean,
   detailed?: boolean,
   contains?: string
}

export interface ProductPage {
   content : ProductModel[]
}
