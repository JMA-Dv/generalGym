import { DocumentReference } from 'angularfire2/firestore';

export class Client{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimineto: Date;
    imgUrl: string;
    telefono: number;
    registro: string;
    ref: DocumentReference;
    visible: Boolean;

    constructor() {

    }
}