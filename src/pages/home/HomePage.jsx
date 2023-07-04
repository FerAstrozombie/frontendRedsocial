import { useContext, useEffect, useState } from "react";
import AuthContex from "../../context/AuthContext";
import { getPublicaciones, refresh } from "../../services/axiosCrudServices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const { token, setToken, setExpiresIn, expiresIn } = useContext(AuthContex);
    const navigate = useNavigate();

    const obtenerToken = async () => {
        const data = await refresh();
        return data
    };

    useEffect(() => {
        obtenerToken().then((res) => {
            if (res) {
                setToken(res.data.token);
                setExpiresIn(res.data.expiresIn);
            }
        }).catch((error) => {
            console.log(error);
        })
    });

    return (

        <div>
            {
                token
                    ?
                    <div>
                        {
                            navigate("/publicaciones")
                        }
                    </div>
                    :
                    <div>
                        <h2>Bienvenido</h2>
                        <h3>Que queres hacer?</h3>
                        <div>
                            <button onClick={() => navigate("/login")}>
                                Loguearte
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/register")}>
                                Registrarte
                            </button>
                        </div>
                    </div>
            }
        </div>

    )
}

export default HomePage