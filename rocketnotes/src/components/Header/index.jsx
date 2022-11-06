import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles";


export function Header() {
    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src="https://github.com/MarceloGalliDev.png"
                    alt="Foto de perfil do usuário"
                />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Marcelo L. Galli</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}