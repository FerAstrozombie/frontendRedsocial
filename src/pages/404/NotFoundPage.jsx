import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <div>
                <button onClick={() => navigate("/profile")}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default NotFoundPage