import { Component, OnInit } from '@angular/core';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  orderProducts : OrderProductModel[] = []
  subtotals : number[] = []
  total = 0

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((products : OrderProductModel[])=> {
      this.total = 0
      this.subtotals = []
      this.orderProducts = products
      this.orderProducts.forEach(product=>{
        let subtotal = product.calculatedPrice*product.quantity
        this.subtotals.push(subtotal)
        this.total+=subtotal
      })
    })
  }
}
