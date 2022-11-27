import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function Home() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);//aqui temos um useEffect criando uma função e chamando ela dentro do escopo do useEffect

    return (
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        isActive
                    />
                </li>
                {
                    tags && tags.map(tag => (//fazemos nesse formato para se certificar se existe tags dentro do estado
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section title="Minhas notas"> 
                    <Note data={{
                        title: "React",
                        tags: [
                            { id: "1", name: "React" },
                            { id: "2", name: "Next" }
                        ]
                    }}/>
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
};