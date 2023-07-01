import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../../context/AuthContext";

const Profile = () => {

    const navigate = useNavigate();
    const { token } = useContext(AuthContex);

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
                            <button onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/register")}>
                                Registro
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/logout")}>
                                Cerrar cesion
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