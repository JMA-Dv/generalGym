import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  priceForm: FormGroup;
  prices: any[] = new Array<any>();

  constructor(private formBuilder: FormBuilder, private db: AngularFirestore,
              private toast: MessagesService ) { }

  ngOnInit(): void {
    this.priceForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    });

    this.db.collection('precios').get().subscribe((result) => {
      result.docs.forEach((data) => {
        let price = data.data();
        price.id = data.id;
        price.ref = data.ref;
        this.prices.push(price);
      });

    });
  }

  add() {
    this.db.collection('precios').add(this.priceForm.value).then(() => {

      this.toast.successMessage('Successful', 'Precio a sido agregado correctamente');
      this.priceForm.reset();
    }).catch(() => {
      this.toast.successMessage('Error', 'Ocurrió un problema');
    });

  }
}
