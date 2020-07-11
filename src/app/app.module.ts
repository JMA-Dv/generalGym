import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from 'src/environments/environment';

import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
