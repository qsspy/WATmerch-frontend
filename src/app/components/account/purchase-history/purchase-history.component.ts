import { Component, OnInit } from '@angular/core';
import { PurchaseExtendedModel } from 'src/app/models/purchase/purchase-extended-model';
import { PurchasePage, PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  purchases : PurchaseExtendedModel[] = []
  subtotals : number[][] = []
  totals : number[] = []

  constructor(private purchaseService : PurchaseService) {}

  ngOnInit(): void {

    this.purchaseService.getUserPurchases().subscribe((data : PurchasePage)=>{
      this.subtotals = []
      this.totals = []
      this.purchases = data.content

      for(let i=0;i<this.purchases.length;i++) {
        this.totals.push(0)
        for(let j=0;j<this.purchases[i].orderProducts.length;j++) {
          const orderProduct = this.purchases[i].orderProducts[j]
          const quantity = orderProduct.quantity
          const product = orderProduct.product
          this.subtotals.push([])
          let subtotal = 0

          if(product?.basicDetails?.discountPercent) {
            subtotal = quantity! * (product.price - (product.basicDetails.discountPercent * product.price))
          } else {
            subtotal = quantity! * product!.price
          }

          this.subtotals[i].push(subtotal)
          this.totals[i] += subtotal
        }
      }
    })
  }

}
