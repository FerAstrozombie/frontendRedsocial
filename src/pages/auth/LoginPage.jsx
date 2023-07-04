import LoginForm from "../../components/loginForm/LoginForm";
import { useContext, useEffect } from "react";
import AuthContex from "../../context/AuthContext";
import HomePage from "../home/HomePage";
import { refresh } from "../../services/axiosCrudServices";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const { token, setToken } = useContext(AuthContex);

    const obtenerToken = async () => {
        const data = await refresh();
        return data
    };

    useEffect(() => {
        obtenerToken().then((res) =>{
            if (res.data) {
                setToken(res.data.token);
            }
        }).catch((error) => {
            navigate("/login")
            console.log(error);
        })    
    });

    return (
        token? <HomePage /> : <LoginForm />
    )
}

export default LoginPage