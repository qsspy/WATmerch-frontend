import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input('description') description! : string | undefined

  descriptionSelected = true
  shippingSelected = false
  reviewsSelected = false

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
