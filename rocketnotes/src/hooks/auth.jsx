import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {//quando usado dentro de um objeto JS, não é necessário seguir a mesma ordem caso necessite chamar a propriedade fora desse function

        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));//estamos transformando o objeto em um texto, utilizando a função JSON.stringify
            localStorage.setItem("@rocketnotes:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({ user, token });
            
        } catch (error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possivel se conectar!")
            }
        }
    }

    function signOut() {
        const token = localStorage.removeItem("@rocketnotes:token");
        const user = localStorage.removeItem("@rocketnotes:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            
            if(avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);//estamos enviando para o backend o avatar

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;//esse é o avatar que chega por paramêtro no updateProfile
            }

            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

            setData({ user, token: data.token });//aqui estamos pegando o token que esta dentro do estado

            alert("Perfil atualizado!");

        } catch (error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possivel atualizar os dados!")
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token");
        const user = localStorage.getItem("@rocketnotes:user");

        if(token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
            })
        }

    }, []);

    return (
        <AuthContext.Provider value={{ 
            signIn, 
            signOut,
            updateProfile, 
            user: data.user,
        }}>
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