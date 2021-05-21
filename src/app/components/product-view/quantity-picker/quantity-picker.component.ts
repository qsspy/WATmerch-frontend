import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quantity-picker',
  templateUrl: './quantity-picker.component.html',
  styleUrls: ['./quantity-picker.component.css']
})
export class QuantityPickerComponent implements OnInit {

  count = 1
  @Input("max-value") maxValue!: string

  constructor() { }

  ngOnInit(): void {
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
