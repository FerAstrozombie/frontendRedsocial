import LoginForm from "../../components/loginForm/LoginForm";
import { useContext } from "react";
import AuthContex from "../../context/AuthContext";
import HomePage from "../home/HomePage";

const LoginPage = () => {

    const { token } = useContext(AuthContex);
    
    return (
        token? <HomePage /> : <LoginForm />
    )
}

export default LoginPage