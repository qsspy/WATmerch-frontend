import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  orderProducts : OrderProductModel[] = []
  subtotals : number[] = []
  total : number = 0

  updateEnabled = false

  constructor(
    private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data : OrderProductModel[]) => {
      this.orderProducts = data
      this.subtotals = []
      this.total = 0
      this.orderProducts.forEach(product => {
        let subtotal = product.quantity*product.calculatedPrice
        this.subtotals.push(subtotal)
        this.total += subtotal
      })
    })
  }

  deleteProduct(barcode : string) {
    this.cartService.removeProduct(barcode)
  }

  updateProducts() {

    this.cartService.addNewProductSet(this.orderProducts)

    Swal.fire({
      title: 'Pomyślnie zaktualizowano!',
      icon: 'success'
    })

    this.updateEnabled = false
  }

  onChangeQuantity(event : any, product : OrderProductModel) {

    event.target.value = Math.min(99, event.target.value)
    event.target.value = Math.max(1, event.target.value)
    product.quantity = event.target.value
    this.updateEnabled = true
  }
}
