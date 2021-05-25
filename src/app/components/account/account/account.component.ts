import { Component, OnInit } from '@angular/core';
import { PurchaseExtendedModel } from 'src/app/models/purchase/purchase-extended-model';
import { PurchaseModel } from 'src/app/models/purchase/purchase-model';
import { PurchasePage, PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

 constructor() {}
  ngOnInit(): void {
    
  }
}
