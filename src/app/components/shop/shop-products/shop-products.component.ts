import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductModel } from 'src/app/models/product/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css']
})
export class ShopProductsComponent implements OnInit {

  private _categoryId: number
  private _keyword: string
  private _pagesLoaded = 0
  private _appendToken = false

  products: ProductModel[] = []
  productsImageUrls: any[] = []

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer) {
    this._categoryId = this.productService.activeCategoryId
    this._keyword = this.productService.keyword
  }

  ngOnInit(): void {

    this.productService.shopProductsSubject.subscribe((data : ProductModel[]) => {
      if(this._appendToken) {
        this.products = this.products.concat(data)
        this._appendToken = false
      } else {
        this.products = data
        this.productsImageUrls = []
        this._pagesLoaded = 0
      }
        data.forEach((product: ProductModel) => {
          if (product.basicDetails) {

            let objectURL = 'data:image/jpeg;base64,' + product.basicDetails.logoImage;
            this.productsImageUrls.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
          }
        });

        this._pagesLoaded++
    })

    this.loadNextPage(5)
  }

  loadNextPageOnClick() {
    this.loadNextPage(5);
  }

  loadNextPage(size: number) {
    this._appendToken = true
    this.productService.getShopProducts(size, this._pagesLoaded)
  }
}
