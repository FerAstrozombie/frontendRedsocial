import RegisterForm from "../../components/registerForm/RegisterForm";
import { useContext, useEffect } from "react";
import AuthContex from "../../context/AuthContext";
import { refresh } from "../../services/axiosCrudServices";
import Inicio from "../Inicio/Inicio";

const RegisterPage = () => {
    const { token, setToken } = useContext(AuthContex);

    const obtenerToken = async () => {
        const data = await refresh();
        return data
    };

    useEffect(() => {
        obtenerToken().then((res) => {
            if (res.data) {
                setToken(res.data.token);
            }
        }).catch((error) => {
            console.log(error);
        })
    });

    return (
        token ? <Inicio /> : <RegisterForm />
    )
}

export default RegisterPage