import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit{

  @ViewChild('selectedColorLabel') selectedColorLabel!: ElementRef

  colors = new Map<string, string>()
  selectedColor? : any

  constructor() {
    this.colors.set("Czerwony", "rgb(255, 96, 96)")
    this.colors.set("Niebieski", "rgb(89, 89, 255)")
    this.colors.set("Zielony", "rgb(51, 172, 51)")
  }

  ngOnInit(): void { }

  selectColor(colorName : string, event : any) {
    console.log('peep')
    
    if(this.selectedColor) {
      if(this.selectedColor == event.target) {
        this.selectedColor.parentNode.classList.remove('selected-color')
        this.selectedColor = null
        this.selectedColorLabel.nativeElement.innerHTML = 'Dowolny'
      } else {
        this.selectedColor.parentNode.classList.remove('selected-color')
        this.selectedColor = event.target
        this.selectedColor.parentNode.classList.add('selected-color')
        this.selectedColorLabel.nativeElement.innerHTML = colorName
      } 
    } else {
      this.selectedColor = event.target
      console.log(this.selectedColor.parentNode.classList)
      this.selectedColor.parentNode.classList.add('selected-color')
      this.selectedColorLabel.nativeElement.innerHTML = colorName
    }
  }
}
