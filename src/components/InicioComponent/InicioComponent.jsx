import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContex from "../../context/AuthContext";
import { getPublicaciones, refresh } from "../../services/axiosCrudServices";

const InicioComponent = () => {

    const { token, setToken, setExpiresIn } = useContext(AuthContex);
    const [publicaciones, setPublicaciones] = useState([]);
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

    const obtenerData = async () => {
        if (token) {
            const data = await getPublicaciones(token);
            return data
        }
    };

    useEffect(() => {
        obtenerData().then((res) => {
            if (res) {
                const data = res.data.publicaciones
                setPublicaciones(data)
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [token]);

    return (

        <div>
            {
                publicaciones.length === 0
                    ?
                    <div>
                        <h2>No hay publicaciones disponibles</h2>
                    </div>
                    :
                    <div>
                        {
                            publicaciones.map((publicacion, index) => (
                                <div key={index}>
                                    <p>{publicacion.posteo}</p>
                                </div>
                            ))
                        }
                        <div>
                            <button onClick={() => navigate("/profile")}>
                                Perfil
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default InicioComponent