import { useNavigate } from "react-router-dom"

const Profile = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Perfil</h1>
            <div>
                <button onClick={() => navigate("/")}>
                    Inicio
                </button>
            </div>
            <div>
                <button onClick={() => navigate("/logout")}>
                    Cerrar cesion
                </button>
            </div>
        </div>
    )
}

export default Profile