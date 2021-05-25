import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductModel } from 'src/app/models/product/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { QuantityPickerComponent } from '../quantity-picker/quantity-picker.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @ViewChild('quantityPicker', {static: true}) quantityPicker! : QuantityPickerComponent

  product? : ProductModel
  productImageUrl : any

  constructor(
    private productService : ProductService,
    private route : ActivatedRoute,
    private sanitizer : DomSanitizer,
    private cartService : CartService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productService.getProduct(+params.get('id')!).subscribe((data : ProductModel) => {
        this.product = data
        
        let objectURL = 'data:image/jpeg;base64,' + data.basicDetails!.logoImage
        this.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL)
      })
    })
  }

  addProductToCart() {

    this.cartService.appendProduct(this.product!,this.productImageUrl, this.quantityPicker.count)

    Swal.fire({
      title: 'Dodano do koszyka!',
      icon: 'success'
    })
  }
}
