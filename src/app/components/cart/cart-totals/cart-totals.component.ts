import { Component, OnInit } from '@angular/core';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-totals',
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.css']
})
export class CartTotalsComponent implements OnInit {

  constructor(private cartService : CartService) { }

  subtotals : number[] = []
  total = 0

  ngOnInit(): void {
    this.cartService.orderProducts.subscribe((products : OrderProductModel[])=> {
      this.subtotals = []
      this.total = 0

      products.forEach(product => {
        let subtotal = product.quantity*product.calculatedPrice
        this.subtotals.push(subtotal)
        this.total += subtotal
      })
    })
  }

}
