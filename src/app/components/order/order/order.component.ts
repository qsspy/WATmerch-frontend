import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import Swal from 'sweetalert2';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrderTotalsComponent } from '../order-totals/order-totals.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('form') form!: OrderFormComponent
  @ViewChild('totals') totals!: OrderTotalsComponent

  productsExists = false

  constructor(
    private cartService: CartService,
    private router: Router,
    private purchaseService: PurchaseService) { }

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data: OrderProductModel[]) => this.productsExists = data.length != 0)
  }

  placeOrder(event: any) {
    if (this.form.isFormValid()) {

      event.target.disabled = true

      this.purchaseService.sendPurchase(this.totals.orderProducts, this.form.shippingAddress, this.form.billingAddress).subscribe(
        (data: any) => {
          this.cartService.emptyCart()
          this.router.navigate(['/orderComplete'])

          Swal.fire({
            title: 'Zamówienie zostało złożone pomyślnie!',
            icon: 'success'
          })
        }
      )
    }
  }
}
