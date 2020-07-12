import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MessagesService } from '../services/messages.service';
import { Price } from '../models/price';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  priceForm: FormGroup;
  prices: Price[] = new Array<Price>();
  editable = false;
  id: string;
  constructor(private formBuilder: FormBuilder, private db: AngularFirestore,
              private toast: MessagesService ) { }

  ngOnInit(): void {
    this.priceForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    });
    this.showPrices();

  }
  showPrices() {
    this.db.collection<Price>('precios').get().subscribe((result) => {
      this.prices.length = 0;
      result.docs.forEach((data) => {
        let price = data.data() as Price;
        price.id = data.id;
        price.ref = data.ref;
        this.prices.push(price);
      });

    });
  }

  add() {
    this.db.collection<Price>('precios').add(this.priceForm.value).then(() => {

      this.toast.successMessage('Successful', 'Precio a sido agregado correctamente');
      this.priceForm.reset();
      this.showPrices();
    }).catch(() => {
      this.toast.successMessage('Error', 'Ocurrió un problema');
    });

  }

  updatePrice(price: Price){
    this.editable = true;
    this.priceForm.setValue({
      nombre: price.nombre,
      costo: price.costo,
      duracion: price.duracion,
      tipoDuracion: price.tipoDuracion
    });
    this.id = price.id;

  }

  update(){
    this.db.doc('precios/' + this.id).update(this.priceForm.value).then(() => {
      this.toast.successMessage('Registro Éxitoso','Precio actualizado correctamente');
      this.editable = false;
      this.showPrices();
      this.priceForm.reset();
    }).catch(() => {
      this.toast.errorMessage('Error', 'Ocurrió un error al intentar actualizar');
    });

  }
}
