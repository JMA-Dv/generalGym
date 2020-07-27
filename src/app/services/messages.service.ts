import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }


  successMessage(titl: string, message: string) {
    Swal.fire({
      title: titl,
      text: message,
      icon: 'success'
    });
  }
  errorMessage(titl: string, message: string) {
    Swal.fire({
      title: titl,
      text: message,
      icon: 'error'
    });
  }
  warningMessage(titl: string, message: string) {
    Swal.fire({
      title: titl,
      text: message,
      icon: 'question'
    });
  }
}
