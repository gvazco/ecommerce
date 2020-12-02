export class User{
    constructor(
        public _id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public role: string,
        public perfil: string,
        public telefono: string,
        public pais: string,
    ){
    }
}