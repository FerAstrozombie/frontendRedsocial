import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContex from "../../context/AuthContext";
import { getPublicaciones, refresh } from "../../services/axiosCrudServices";
import CrearPublicacion from "../CrearPublicacion/CrearPublicacion";

const InicioComponent = () => {

    const { token, setToken, setExpiresIn } = useContext(AuthContex);
    const [publicaciones, setPublicaciones] = useState([]);
    const [posteo, setPosteo] = useState("");
    const initialValues = {
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""
    }
    const [user, setUser] = useState(initialValues);
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
                const data = res.data.publicaciones;
                setPublicaciones(data);
                const userFind = res.data.userFind;
                setUser(userFind);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [token]);

    function handleAction(evento) {
        setPosteo(evento);
    }

    return (

        <div>
            {
                token
                    ?
                    publicaciones.length === 0
                        ?
                        <div>
                            <h2>No hay publicaciones disponibles</h2>
                            <CrearPublicacion token={token} />
                        </div>
                        :
                        <div>
                            <CrearPublicacion token={token} onAction={handleAction} />
                            {
                                publicaciones.map((publicacion, index) => (
                                    <div key={index}>
                                        <p>{user.nombre} {user.apellido}</p>
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
                    :
                    <div>
                        <h2>No estas logueado</h2>
                        <div>
                            <button onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default InicioComponent