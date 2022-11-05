import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Profile() {
    return(
        <Container>
            <header>
                <a href="/">
                    <FiArrowLeft/>
                </a>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src="https://github.com/MarceloGalliDev.png" 
                        alt="Foto do perfil do usuário" 
                    />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input
                            id="avatar" 
                            type="file" 
                        />
                    </label>
                </Avatar>
                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                />

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                />

                <Button title="Salvar"/>
            </Form>
        </Container>
    )
}

