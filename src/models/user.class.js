export class User {
    email = "";
    password = "";
    repassword = "";

    constructor(email, password, repassword){
        this.email = email;
        this.password = password;
        this.repassword = repassword
    }
}