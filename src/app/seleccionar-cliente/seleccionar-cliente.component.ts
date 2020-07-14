import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Client } from '../models/client';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clients: Client[] =  new Array<Client>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<Client>('clientes').get().subscribe((result) => {
      this.clients.length = 0;
      result.docs.forEach((item) => {
        const clien: Client = item.data() as Client;
        clien.id = item.id;
        clien.ref = item.ref;
        clien.visible = false;
        this.clients.push(clien);
      });
      console.log(this.clients);
    });

  }
  searchClient(name: string){
    this.clients.forEach((client) => {
      if(client.nombre.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
        client.visible = true;
      } else {
        client.visible = false;
      }
    });
  }

}
