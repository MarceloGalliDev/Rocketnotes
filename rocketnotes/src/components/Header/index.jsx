import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api"


export function Header() {
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src={avatarUrl}
                    alt="Foto de perfil do usuário"
                />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Marcelo L. Galli</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}