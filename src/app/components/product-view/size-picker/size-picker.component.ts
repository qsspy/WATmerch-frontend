import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-size-picker',
  templateUrl: './size-picker.component.html',
  styleUrls: ['./size-picker.component.css']
})
export class SizePickerComponent implements OnInit {

  @ViewChild('selectedSizeLabel', { static: true }) selectedSizeLabel!: ElementRef

  sizes: string[] = ['S', 'M', 'L', 'XL']
  selectedSizeElement: any

  constructor() { }

  ngOnInit(): void {
  }

  selectSize(size: string, event: any) {
    console.log('peep')

    if (this.selectedSizeElement) {
      if (this.selectedSizeElement == event.currentTarget) {
        this.selectedSizeElement.classList.remove('selected-size')
        this.selectedSizeElement = null
        this.selectedSizeLabel.nativeElement.innerHTML = 'Dowolny'
      } else {
        this.selectedSizeElement.classList.remove('selected-size')
        this.selectedSizeElement = event.currentTarget
        this.selectedSizeElement.classList.add('selected-size')
        this.selectedSizeLabel.nativeElement.innerHTML = size
      }
    } else {
      this.selectedSizeElement = event.currentTarget
      this.selectedSizeElement.classList.add('selected-size')
      this.selectedSizeLabel.nativeElement.innerHTML = size
    }
  }
}
