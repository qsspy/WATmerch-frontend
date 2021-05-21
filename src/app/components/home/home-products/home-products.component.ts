import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {

  @Input() productCount!: string

  randomProducts? : ProductModel[]
  randomProductsImageURLs : any[] = []

  constructor(private productService : ProductService,
              private sanitizer: DomSanitizer,
              private router : Router) { }

  ngOnInit(): void {

    this.productService.getRandomProducts(+this.productCount,false, true).subscribe(
      (data : ProductModel[]) => {
        this.randomProducts = data

        data.forEach((product : ProductModel)=> {
          if(product.basicDetails) {
            
            let objectURL = 'data:image/jpeg;base64,' + product.basicDetails.logoImage
            this.randomProductsImageURLs.push(this.sanitizer.bypassSecurityTrustUrl(objectURL))
          }
        })
      }
    )
  }
}
