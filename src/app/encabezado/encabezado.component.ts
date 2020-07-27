import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  user: User;
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      setTimeout(() => {
        this.user = user;

      }, 500);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
