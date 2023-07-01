import { createContext, useState } from "react";

const AuthContex = createContext();


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(null);

    const data = {token, setToken};

    return <AuthContex.Provider value={data}>{children}</AuthContex.Provider>
};

export default AuthContex;