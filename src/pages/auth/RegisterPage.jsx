import RegisterForm from "../../components/registerForm/RegisterForm";
import { useContext } from "react";
import AuthContex from "../../context/AuthContext";
import HomePage from "../home/HomePage";

const RegisterPage = () => {
    const { token } = useContext(AuthContex);

    return (
        token? <HomePage /> : <RegisterForm />
    )
}

export default RegisterPage