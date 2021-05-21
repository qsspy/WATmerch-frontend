import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  descriptionSelected = true
  shippingSelected = false
  reviewsSelected = false

  description = "Tu w przyszłości znajdzie się szczegółowy opis produktu"
  shipping = "Tu w przyszłości znajdą się informacje o dostawie"
  reviews = "Tu w przyszłości znajdzie się sekcja opinii użytkowników produktu"

  constructor() { }

  ngOnInit(): void {
  }

  selectSection(id : number) {
    this.descriptionSelected = false
    this.shippingSelected = false
    this.reviewsSelected = false

    switch(id) {
      case 1 : 
        this.descriptionSelected=true
        break
      case 2 : 
        this.shippingSelected=true
        break
      default:
        this.reviewsSelected=true
      
    }
  }
}
