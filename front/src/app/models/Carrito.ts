export class Carrito{
    constructor(
        public _id: string,
        public producto: string,
        public user: string,
        public cantidad: number,
        public color: string,
        public selector: string,
        public precio: number,
    ){
    }
}