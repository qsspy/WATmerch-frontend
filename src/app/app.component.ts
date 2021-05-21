import { Component, ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('sidenav', {static: true})sidenav! : MatSidenav

  title = 'WATmerch-frontend'

  ngAfterViewInit(): void {
  }

  toggleSidenav() {

    this.sidenav.toggle()
  }
}
