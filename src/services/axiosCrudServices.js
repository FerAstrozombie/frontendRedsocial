import axios from "axios";

export const login = async (email, password, repassword) => {

    let body = {
        email: email,
        password: password,
        repassword: repassword
    };

    

    try {
        const headers = {
            'Content-Type': 'application/json',
            /* 'Authorization': `Bearer ${token}` */
        };
        const response = await axios.post("http://localhost:8080/api/v1/auth/login", body, {
            headers: headers
        })
        return response;
    } catch (error) {
        if(error.request.status === 400){
            let errorLoginOne = JSON.parse(error.request.response);
            let errorFinal = errorLoginOne.error[0].msg;
            return errorFinal;
        }
        if(error.request.status === 403){
            let errorLogin =JSON.parse(error.request.response);
            return errorLogin;
        }
    }
};

export const createUser = (email, password, repassword) => {
    let body = {
        email,
        password,
        repassword
    };
    
    return axios.post("http://localhost:8080/api/v1/auth/register", body)
};