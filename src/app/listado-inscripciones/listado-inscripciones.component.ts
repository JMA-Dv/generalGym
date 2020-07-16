import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Inscription } from '../models/inscription';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscriptions: any[] = new Array<any>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscriptions.length = 0;
    this.db.collection('inscripciones').get().subscribe((result) => {
      result.forEach((inscription) => {
        let getInscriptions = inscription.data();
        getInscriptions.id = inscription.id;

        this.db.doc(inscription.data().cliente.path).get().subscribe((client) => {
          getInscriptions.getClient = client.data();
          getInscriptions.fecha = new Date(getInscriptions.fecha.seconds * 1000);
          getInscriptions.fechaFinal = new Date(getInscriptions.fechaFinal.seconds * 1000);
          this.inscriptions.push(getInscriptions);
          console.log(getInscriptions.fechaFinal);

        });

        //console.log(getInscriptions);
      });
    });
  }

}
