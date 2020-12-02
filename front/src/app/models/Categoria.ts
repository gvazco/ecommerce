export class Categoria{
    constructor(
        public _id: string,
        public icono : string,
        public nombre: string,
        public subcategorias: string,
        public banner: string,
        public state_banner : boolean,

    ){
    }
}