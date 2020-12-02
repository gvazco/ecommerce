export class Direccion{
    constructor(
        public _id: string,
        public nombres_completos: string,
        public direccion: string,
        public referencia : string,
        public pais: string,
        public ciudad : string,
        public zip : string,
        public user: string,
    ){
    }
}