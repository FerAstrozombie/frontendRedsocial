import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../../context/AuthContext";

const HomePage = () => {

    const navigate = useNavigate();

    const { token } = useContext(AuthContex);

    return (
        <div>
            {
                token ?
                    <div>
                        <h1>Home Page</h1>
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

export default HomePage