import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductModel } from 'src/app/models/product/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(
    private productService : ProductService,
    private route : ActivatedRoute,
    private sanitizer : DomSanitizer) { }

  product? : ProductModel
  productImageUrl : any

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productService.getProduct(+params.get('id')!).subscribe((data : ProductModel) => {
        this.product = data
        
        let objectURL = 'data:image/jpeg;base64,' + data.basicDetails!.logoImage
        this.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL)
      })
    })
  }
}
