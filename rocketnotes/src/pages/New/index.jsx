import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Container, Form } from "./styles";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function New() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([]);//aqui armazena todos os links
    const [newLink, setNewLink] = useState("");//aqui armazena somente um link que será adicionando no outro estado

    const [tags, setTags] = useState([]);//coleção de tags
    const [newTag, setNewTag] = useState("");

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);//aqui estamos acessando tudo que tinha antes atraves do prevState e despejando dentro do novo array + o novo link
        setNewLink("");//aqui limpamos o estado, para resetar ele para o próximo que vira
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));//o filter ele vai retorna uma nova lista baseada no filtro que eu desejar
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);//o spread operator é usado para que não fique uma lista dentro de outra lista, fique todos no mesmo nível
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {
        if(!title) {
            return alert("Digite o título da nota!")
        };

        if(newLink) {
            return alert("Campo link preenchido mais não está adicionado!")
        };

        if(newTag) {
            return alert("Campo tag preenchido mais não está adicionado!")
        };

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!");
        navigate(-1);
    }

    return(
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText>Voltar</ButtonText>

                    </header>

                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                        placeholder="Observação"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links Úteis">
                        {
                            links.map((link, index) => (//estamos recuperando o valor dde link atraves de uma váriavel chamada link e jogando dentro do value
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}//quando preciso passar um paramêtro para um onCLick é nesse formato que deve ser feito
                                />
                            ))
                        }
                        <NoteItem 
                            isNew
                            placeholder="Novo Link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}//funções sem paramêtros não é necessário arrow function
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}