import axios from "axios";

export const login = async (email, password, repassword) => {

    let body = {
        email: email,
        password: password,
        repassword: repassword
    };

    try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/login", body, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        if (error.request.status === 400) {
            let errorLoginOne = JSON.parse(error.request.response);
            let errorFinal = errorLoginOne.error[0].msg;
            return errorFinal;
        }
        if (error.request.status === 403) {
            let errorLogin = JSON.parse(error.request.response);
            return errorLogin;
        }
    }
};

export const createUser = (nombre, apellido, telefono, email, password, repassword) => {
    let body = {
        nombre,
        apellido,
        telefono,
        email,
        password,
        repassword
    };

    return axios.post("http://localhost:8080/api/v1/auth/register", body)
};

export const getPublicaciones = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const response = await axios.get("http://localhost:8080/publicaciones", {
        headers: headers
    }).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
    return response

};

export const refresh = async () => {

    const response = await axios.get("http://localhost:8080/api/v1/auth/refresh", {
        withCredentials: true
    }).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
    return response;
};

export const logout = async () => {

    const response = await axios.get("http://localhost:8080/api/v1/auth/logout",
        {
            withCredentials: true,
            credentials: "include",
        });
    return response;
};

export const infoUser = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const response = await axios.get("http://localhost:8080/api/v1/auth/profile", {
        headers: headers
    }).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
    return response
};

export const crearPublicacion = async (posteo, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    let body = posteo
    const response = await axios.post("http://localhost:8080/publicaciones", body, {
        headers: headers
    }).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
    return response
}