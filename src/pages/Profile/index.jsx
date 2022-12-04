import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";

export function Profile() {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;//ternario para fazer o carregamento incial ou se ja existir uma imagem
    const [avatar, setAvatar] = useState(avatarUrl);//aqui temos o avatar ja carregado caso exista
    const [avatarFile, setAvatarFile] = useState(null);//aqui é o que será carregado pelo usuário

    function handleBack() {
        navigate(-1);
    }

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        };

        const userUpdated = Object.assing(user, updated);
        
        await updateProfile({ userUpdated, avatarFile })
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview)
    }


    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft/>
                </button>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar} 
                        alt="Foto do perfil do usuário" 
                    />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input
                            id="avatar" 
                            type="file"
                            onChange={handleChangeAvatar} 
                        />
                    </label>
                </Avatar>
                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}

