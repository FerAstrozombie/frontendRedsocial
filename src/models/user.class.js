export class User {
    nombre = "";
    apellido = "";
    telefono = "";
    email = "";
    password = "";
    repassword = "";

    constructor(nombre, apellido, telefono, email, password, repassword){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.repassword = repassword
    }
}