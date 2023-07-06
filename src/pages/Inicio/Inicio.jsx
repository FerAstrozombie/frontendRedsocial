import InicioComponent from "../../components/InicioComponent/InicioComponent";
import AuthContex from "../../context/AuthContext";
import { refresh } from "../../services/axiosCrudServices";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../auth/LoginPage";


const Inicio = () => {

    const navigate = useNavigate();
    const { token } = useContext(AuthContex);

    const obtenerToken = async () => {
        const data = await refresh();
        return data
    };

    useEffect(() => {
        obtenerToken().then(() =>{
        }).catch((error) => {
            navigate("/login")
            console.log(error);
        })    
    });

    return (
        token? <InicioComponent /> : <LoginPage />
    )
}

export default Inicio