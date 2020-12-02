export class Cupon{
    constructor(
        public _id: string,
        public categoria: string,
        public subcategoria: string,
        public descuento: number,
        public user: string,
        public tipo: string,
        public codigo: string,
    ){
    }
}