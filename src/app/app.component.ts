import { Component, ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OutletContext, RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({height: '!',overflow: 'hidden'}),
        query(':enter', style({opacity:0}),{ optional: true }),
        query(':enter, :leave', style({position: 'absolute', top:0, left:0, width:'100%'}),{ optional: true }),
        group([
          query(':leave', [animate('0.3s ease', style({opacity:0}))],{ optional: true }),
          query(':enter', [animate('0.3s 0.3s ease', style({opacity:1}))],{ optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('sidenav', {static: true})sidenav! : MatSidenav

  title = 'WATmerch-frontend'

  ngAfterViewInit(): void {
  }

  toggleSidenav() {

    this.sidenav.toggle()
  }

  getDepth(outlet : RouterOutlet) {
    return outlet.activatedRouteData['depth']
  }
}
