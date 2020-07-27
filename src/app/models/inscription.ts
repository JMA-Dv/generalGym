import { DocumentReference } from 'angularfire2/firestore';

export class Inscription {
    fecha: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    precios: DocumentReference;
    discount: number;
    subTotal: number;
    total: number;
    constructor() {
        this.fecha = null;
        this.fechaFinal = null;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.discount = this.discount;
        this.subTotal = this.subTotal;
        this.total = this.total;

    }
    validate(): any {
        let response = {
            isValid: false,
            message: ''
        };

        if (this.cliente == null || this.cliente == undefined) {
            response.isValid = false;
            response.message = 'No ha seleccionado un cliente';
            return response;
        }

        if (this.precios == null || this.precios == undefined) {
            response.isValid = false;
            response.message = 'No tiene precio seleccionado';
            return response;
        }
        if (this.fecha == null || this.fecha == undefined) {
            response.isValid = false;
            response.message = 'No tiene fecha de inicio';
            return response;
        }
        if (this.fechaFinal == null || this.fechaFinal == undefined) {
            response.isValid = false;
            response.message = 'No tiene fecha final';
            return response;
        }
        if (this.discount <= 0 || this.discount == undefined) {
            response.isValid = false;
            response.message = 'No tiene descuento o no es valido ';
            return response;
        }
        if (this.subTotal <= 0 || this.subTotal == undefined) {
            response.isValid = false;
            response.message = 'No se puede calcular el subtotal';
            return response;
        }
        if (this.total <= 0 || this.total == undefined) {
            response.isValid = false;
            response.message = 'No se puede calcular el total';
            return response;
        }
        response.isValid = true;
        return response;

    }
}
