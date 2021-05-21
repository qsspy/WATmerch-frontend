import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  buttonClicked = false

  form : any = {
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.buttonClicked = true
    
    let passed = true
    for(const field in this.form) {
      if(this.form[field].trim().length == 0) {
        passed = false
        break
      }
    }

    if(passed) {
      Swal.fire({
        title: 'Wiadomość została wysłana!',
        icon: 'success'
      })

      this.buttonClicked = false

      this.form.name = ''
      this.form.email = ''
      this.form.phoneNumber = ''
      this.form.subject = ''
      this.form.message = ''

    }
  }
}
