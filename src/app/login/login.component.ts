import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  correctData = true;
  textError = '';

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  ingresar() {

    if (this.formLogin.valid){
      this.correctData = true;
      this.spinner.show();
      this.afAuth.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
      .then((usuario) => {
        this.spinner.hide();
        console.log(usuario);
      }).catch((error) => {
        this.correctData  = false;
        this.textError = error.message;
        this.spinner.hide();
      });

    } else {
      this.correctData  = false;
      this.textError = 'Revisa que los datos estén correctos';
    }

  }
}
