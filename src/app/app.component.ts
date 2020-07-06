import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth, User } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'generalGym';
  usuario: User;
  cargando: boolean = true;
  constructor(public afAuth: AngularFireAuth) {

    this.afAuth.user.subscribe((usuario) => {
      setTimeout(() => {
        this.cargando = false;
        this.usuario = usuario;

      }, 1000);
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword('mata@gmail.com', '123456');
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
