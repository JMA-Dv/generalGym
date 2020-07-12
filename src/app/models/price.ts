import { DocumentReference } from 'angularfire2/firestore';

export class Price {
    id: string;
    nombre: string;
    costo: number;
    duracion: number;
    tipoDuracion: number;
    ref: DocumentReference;


}