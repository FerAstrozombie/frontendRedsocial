import { createContext, useState } from "react";

const AuthContex = createContext();


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null)

    const data = {token, setToken, expiresIn, setExpiresIn};

    return <AuthContex.Provider value={data}>{children}</AuthContex.Provider>
};

export default AuthContex;