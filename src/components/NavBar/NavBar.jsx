import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li className="lista"><NavLink to={"/"}>Inicio</NavLink></li>
                <li className="lista"><NavLink to={"/profile"}>Perfil</NavLink></li>   
            </ul>
        </nav>
    )
}

export default NavBar