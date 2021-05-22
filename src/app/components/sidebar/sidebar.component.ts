import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter()

  constructor(
    private cartService : CartService,
    private router : Router) { }

  orderProducts : OrderProductModel[] = []
  showTotal = false
  total = 0

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data : OrderProductModel[])=> {
      this.orderProducts = data
      this.total = 0
      this.showTotal = this.orderProducts.length != 0
      this.orderProducts.forEach(product => this.total += product.calculatedPrice*product.quantity)
    })
  }

  deleteOrderProduct(barcode : string) {
    this.cartService.removeProduct(barcode)
  }

  showProductView(barcode : string) {
    this.router.navigate(['/product', barcode])
    this.sidenavToggle.emit()
  }

  showCart() {
    this.router.navigate(['/cart'])
    this.sidenavToggle.emit()
  }

  showOrder() {
    this.router.navigate(['/order'])
    this.sidenavToggle.emit()
  }

  toggleSidenav() {
    this.sidenavToggle.emit()
  }
}
