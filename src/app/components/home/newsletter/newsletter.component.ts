import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: true }) private input!: ElementRef
  @ViewChild('submit', { static: true }) private submit!: ElementRef
  @ViewChild('error', { static: true }) private error!: ElementRef

  constructor() { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {

    this.submit.nativeElement.addEventListener('click', () => {

      if (this.validateEmail(this.input.nativeElement.value)) {
        this.error.nativeElement.classList.add('d-none')
        Swal.fire({
          title: 'Dziękujemy! Nie pożałujesz!',
          icon: 'success'
        })
        this.input.nativeElement.value = ''
      } else {
        this.error.nativeElement.classList.remove('d-none')
      }
    })
  }

  private validateEmail(email: String) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}
