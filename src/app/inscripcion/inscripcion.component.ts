import { Component, OnInit } from '@angular/core';
import { Inscription } from '../models/inscription';
import { Client } from '../models/client';
import { AngularFirestore } from 'angularfire2/firestore';
import { Price } from '../models/price';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscription: Inscription = new Inscription();
  clientSet: Client = new Client();
  prices: Price[] = new Array<Price>();
  selectedPrice: Price = new Price();
  priceId: string = 'null';

  constructor(private db: AngularFirestore, private toast: MessagesService) { }
  ngOnInit(): void {
    this.db.collection<Price>('precios').get().subscribe((result) => {

      result.docs.forEach((item) => {
        const price = item.data() as Price;
        price.id = item.id;
        price.ref = item.ref;
        this.prices.push(price);
      });
    });
  }
  assignClient(client: Client) {
    this.inscription.cliente = client.ref;
    console.log('This is client' + client);
    this.clientSet = client;


  }
  deleteClient() {
    this.clientSet = new Client();
    this.inscription.cliente = undefined;
  }
  save() {
    
    if (this.inscription.validate().isValid) {
      let addInscription = {
        fecha: this.inscription.fecha,
        fechaFinal: this.inscription.fechaFinal,
        cliente: this.inscription.cliente,
        precios: this.inscription.precios,
        discount: this.inscription.discount,
        subTotal: this.inscription.subTotal,
        total: this.inscription.total
      }

      this.db.collection('inscripciones').add(addInscription).then((result) => {
        console.log('Saving...' + result);
        this.inscription = new Inscription();
        this.clientSet = new Client();
        this.selectedPrice = new Price();
        this.priceId = 'null';
        this.toast.successMessage('Guardado', 'Inscripcion correcta');

      });
    } else {
      this.toast.warningMessage('Advertencia', this.inscription.validate().message);
      console.error(this.inscription.validate().message);
    }
  }

  selectPrice(id: string) {

    if (id != null) {

      this.selectedPrice = this.prices.find(x => x.id === id);
      this.inscription.precios = this.selectedPrice.ref;
      this.inscription.fecha = new Date();

      let days: number;
      let finalDate: Date;
      const chooise = this.selectedPrice.tipoDuracion;

      this.inscription.subTotal = this.selectedPrice.costo;
      this.inscription.discount = this.inscription.subTotal * 0.05;
      this.inscription.total = this.inscription.subTotal + this.inscription.discount;
      switch (Number(chooise)) {

        case 1: {
          days = this.selectedPrice.duracion;
          finalDate = new Date(this.inscription.fecha.getFullYear(),
            this.inscription.fecha.getMonth(),
            this.inscription.fecha.getDate() + days);
          console.log(finalDate);
          this.inscription.fechaFinal = finalDate;
          break;
        }
        case 2: {
          days = this.selectedPrice.duracion * 7;
          finalDate = new Date(this.inscription.fecha.getFullYear(),
            this.inscription.fecha.getMonth(),
            this.inscription.fecha.getDate() + days);
          console.log(finalDate);
          this.inscription.fechaFinal = finalDate;
          break;

        }
        case 3: {
          days = this.selectedPrice.duracion * 15;
          finalDate = new Date(this.inscription.fecha.getFullYear(),
            this.inscription.fecha.getMonth(),
            this.inscription.fecha.getDate() + days);
          console.log(finalDate);
          this.inscription.fechaFinal = finalDate;
          break;
        }
        case 4: {
          const month = this.selectedPrice.duracion + this.inscription.fecha.getMonth();
          const year = this.inscription.fecha.getFullYear();
          const day = this.inscription.fecha.getDate();
          finalDate = new Date(year, month, day);

          console.log(finalDate);
          this.inscription.fechaFinal = finalDate;
          break;
        }
        case 5: {
          const month = this.selectedPrice.duracion;
          const year = this.inscription.fecha.getFullYear() + this.selectedPrice.duracion;
          const day = this.inscription.fecha.getDate();
          finalDate = new Date(year, month, day);

          console.log(finalDate);
          this.inscription.fechaFinal = finalDate;
          break;

        }

      }
    } else {
      this.selectedPrice = new Price();
      this.inscription.precios = null;
      this.inscription.fecha = null;
      this.inscription.fechaFinal = null;

      this.inscription.subTotal = 0;
      this.inscription.discount = 0;
      this.inscription.total = 0;

    }

  }

}
