import { createContext, useContext } from "react";

import { api } from "../services/api"

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    async function signIn({ email, password }) {//quando usado dentro de um objeto JS, não é necessário seguir a mesma ordem caso necessite chamar a propriedade fora desse function
        const response = await api.post("/sessions", { email, password });
    }
    return (
        <AuthContext.Provider value={{ email: 'marcelo@email.com' }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };

//children recebe o filho dentro do main.jsx