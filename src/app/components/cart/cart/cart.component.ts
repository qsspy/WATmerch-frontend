import { Component, OnInit } from '@angular/core';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderExists : boolean = false

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data : OrderProductModel[]) => this.orderExists = data.length != 0)
  }

}
