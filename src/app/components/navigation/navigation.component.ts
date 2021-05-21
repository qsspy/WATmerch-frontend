import { HostListener } from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('navButton', { static: true }) navButton!: ElementRef
  @ViewChild('navIcon', { static: true }) navIcon!: ElementRef
  @ViewChild('navMenu', { static: true }) navMenu!: ElementRef

  @ViewChild('searchText', {static: true}) searchInput!: ElementRef

  private _isExpanded: boolean = false
  private _barsAwesome: String = 'fa-bars'
  private _arrowAwesome: String = 'fa-arrow-down'

  constructor(
    private productService : ProductService,
    private router : Router) { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.navMenu.nativeElement.style.transition = 'max-height 0.5s, opacity 0.5s'
    this.navButton.nativeElement.addEventListener('click', () => {

      if (this._isExpanded) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    })
    this.updateMenuPosition()


  }

  private showMenu() {
    this.navIcon.nativeElement.classList.remove(this._barsAwesome);
    this.navIcon.nativeElement.classList.add(this._arrowAwesome);
    this.navMenu.nativeElement.style.opacity = '1.0';
    this.navMenu.nativeElement.style.maxHeight = '1000px';
    this._isExpanded = !this._isExpanded
  }

  public hideMenu() {
    this.navIcon.nativeElement.classList.remove(this._arrowAwesome);
    this.navIcon.nativeElement.classList.add(this._barsAwesome);
    this.navMenu.nativeElement.style.opacity = '0.0';
    this.navMenu.nativeElement.style.maxHeight = '0px';
    this._isExpanded = !this._isExpanded
  }

  @HostListener('window:resize', ['$event'])
  updateMenuPosition() {
    this.navMenu.nativeElement.style.top =
      `${this.navButton.nativeElement.offsetTop + this.navButton.nativeElement.offsetHeight}px`
  }

  searchProduct() {
    console.log('clicked!')
    let input : string = this.searchInput.nativeElement.value
    this.productService.keyword = input
    if(this.router.url.includes('/shop')) {
      this.productService.getShopProducts(5,0)
    } else {
      this.router.navigate(['/shop'])
    }
  }
}
