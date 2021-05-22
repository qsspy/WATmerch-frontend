import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quantity-picker',
  templateUrl: './quantity-picker.component.html',
  styleUrls: ['./quantity-picker.component.css']
})
export class QuantityPickerComponent implements OnInit {

  count = 1
  @Input("max-value") maxValue!: string
  @Input("init-value") initValue : string = "1"

  constructor() { }

  ngOnInit(): void {

    if(+this.initValue < 1) {
      this.count = 1
    } else {
      this.count = +this.initValue
    }
  }

  decrement() {
    if(this.count > 1) {
      this.count--
    }
  }

  increment() {
    if(this.count < +this.maxValue) {
      this.count++
    }
  }

}
