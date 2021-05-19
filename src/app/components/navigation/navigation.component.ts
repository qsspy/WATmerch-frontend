import { HostListener } from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('navButton', { static: true }) navButton!: ElementRef
  @ViewChild('navIcon', { static: true }) navIcon!: ElementRef
  @ViewChild('navMenu', { static: true }) navMenu!: ElementRef

  private _isExpanded: boolean = false
  private _barsAwesome: String = 'fa-bars'
  private _arrowAwesome: String = 'fa-arrow-down'

  constructor() { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    console.log(this.navIcon)
    console.log(this.navButton)
    console.log(this.navMenu)
    this.navMenu.nativeElement.style.transition = 'max-height 0.5s, opacity 0.5s'
    this.navButton.nativeElement.addEventListener('click', () => {

      if (this._isExpanded) {
        this.navIcon.nativeElement.classList.remove(this._arrowAwesome)
        this.navIcon.nativeElement.classList.add(this._barsAwesome)
        this.navMenu.nativeElement.style.opacity = '0.0'
        this.navMenu.nativeElement.style.maxHeight = '0px'
      } else {
        this.navIcon.nativeElement.classList.remove(this._barsAwesome)
        this.navIcon.nativeElement.classList.add(this._arrowAwesome)
        this.navMenu.nativeElement.style.opacity = '1.0'
        this.navMenu.nativeElement.style.maxHeight = '1000px'
      }

      this._isExpanded = !this._isExpanded
    })
    this.updateMenuPosition()


  }

  @HostListener('window:resize', ['$event'])
  updateMenuPosition() {
    this.navMenu.nativeElement.style.top =
      `${this.navButton.nativeElement.offsetTop + this.navButton.nativeElement.offsetHeight}px`
  }



  //   const button = document.querySelector('#nav-button')
  // const icon = button.querySelector('i')
  // const menu = document.querySelector('#menu')
  // let isExpanded = false

  // const barsAwesome = 'fa-bars'
  // const arrowAwesome = 'fa-arrow-down'

  // menu.style.transition = 'max-height 0.5s, opacity 0.5s'

  // function updateMenuPosition() {
  //     menu.style.top = `${button.offsetTop + button.offsetHeight}px`
  // }

  // function onClick() {

  //     if(isExpanded) {
  //         icon.classList.remove(arrowAwesome)
  //         icon.classList.add(barsAwesome)
  //         menu.style.opacity = '0.0'
  //         menu.style.maxHeight = '0px'
  //     } else {
  //         icon.classList.remove(barsAwesome)
  //         icon.classList.add(arrowAwesome)
  //         menu.style.opacity = '1.0'
  //         menu.style.maxHeight = '1000px'
  //     }

  //     isExpanded =!isExpanded
  // }

  // window.addEventListener('resize',updateMenuPosition)
  // button.addEventListener('click',onClick)
  // updateMenuPosition()

}
