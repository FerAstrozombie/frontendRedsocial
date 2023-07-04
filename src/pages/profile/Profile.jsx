import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContex from "../../context/AuthContext";
import { refresh, logout } from "../../services/axiosCrudServices";

const Profile = () => {

    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContex);

    const obtenerToken = async () => {
        const data = await refresh();
        return data
    };

    useEffect(() => {
        obtenerToken().then((res) => {
            if (res.data) {
                setToken(res.data.token);
            }else {
                navigate("/login")
            }
        }).catch((error) => {
            console.log(error);
            navigate("/login")
        })
    });

    function logoutCesion() {
        logout();
    }

    return (
        <div>
            {
                token ?
                    <div>
                        <h1>Perfil</h1>
                        <div>
                            <button onClick={() => navigate("/")}>
                                Inicio
                            </button>
                        </div>
                        <div>
                            <div>
                                <button onClick={() => logoutCesion()}>
                                    Cerrar Cesion
                                </button>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/register")}>
                                Registro
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

export default Profile