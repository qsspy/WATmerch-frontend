import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('form') form!: OrderFormComponent

  productsExists = false

  constructor(
    private cartService : CartService,
    private router : Router) { }

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data : OrderProductModel[])=> this.productsExists = data.length != 0)
  }

  placeOrder(event : any) {
    if(this.form.isFormValid()) {

      event.target.disabled = true

      this.form.buildPurchaseModelFromForm()

      //sending purchase to backend

      //TODO

      this.cartService.emptyCart()
      this.router.navigate(['/orderComplete'])

      Swal.fire({
        title: 'Zamówmienie zostało złożone pomyślnie!',
        icon: 'success'
      })
    }
  }
}
