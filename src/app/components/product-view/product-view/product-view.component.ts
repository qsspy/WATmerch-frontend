import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(private productService : ProductService) { }

  product? : ProductModel

  ngOnInit(): void {
  }

}
