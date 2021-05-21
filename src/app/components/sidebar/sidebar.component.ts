import { Component, OnInit } from '@angular/core';
import { OrderProductModel } from 'src/app/models/order/order-product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private cartService : CartService) { }

  orderProducts : OrderProductModel[] = []

  ngOnInit(): void {

    this.cartService.orderProducts.subscribe((data : OrderProductModel[])=> {
      this.orderProducts = data
    })
  }

}
