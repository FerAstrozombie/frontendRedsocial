import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContex from "../../context/AuthContext";
import { infoUser, refresh } from "../../services/axiosCrudServices";

const UserProfile = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContex);

    const initialValues = {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
    };

    const [user, setUser] = useState(initialValues);

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
            if(error) navigate("/login")
        })

        obtenerUser().then((res) => {
            if(res.data.user){
                setUser(res.data.user)
            }
        }).catch((error) => {
            if(error) navigate("/login")
        })
    },[]);

    const obtenerUser = async () => {
        const data = await infoUser(token);
        return data
    };


    return (
        <div>
            {
                token ?
                    <div>
                        <h4>{user.nombre}</h4>
                        <h4>{user.apellido}</h4>
                        <h4>{user.telefono}</h4>
                        <h4>{user.email}</h4>
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

export default UserProfile