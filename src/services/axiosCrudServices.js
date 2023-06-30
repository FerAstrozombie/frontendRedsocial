import axios from "axios";

export const login = async (email, password, repassword) => {

    let body = {
        email: email,
        password: password,
        repassword: repassword
    }
    return await axios.post("http://localhost:8080/api/v1/auth/login", body)
};

export const createUser = (email, password, repassword) => {
    let body = {
        email,
        password,
        repassword
    }
    return axios.post("http://localhost:8080/api/v1/auth/register", body)
};