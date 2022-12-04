import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    function handleTagSelected(tagName) {//o paramentro que vai receber terá o nome de tagName
        if(tagName === "all") {
            return setTagsSelected([]);
        };

        const alreadySelected = tagsSelected.includes(tagName);//retornaá valor falos se não estiver selecionado

        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);//estamos passando para dentro do estado as tags filtrada
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);//coloco dentro de um array pois eu recebo várias tags de uma vez
        }
    }

    function handleDetails(id){
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);//aqui temos um useEffect criando uma função e chamando ela dentro do escopo do useEffect

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    },[tagsSelected, search]);//estamos atualizando sempre que mudar esses estados

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
                        onClick={() => handleTagSelected("all")} 
                        isActive={tagsSelected.length === 0}//o retorno dessa condição retorna verdadeiro se estiver vazio dentro do estado
                    />
                </li>
                {
                    tags && tags.map(tag => (//fazemos nesse formato para se certificar se existe tags dentro do estado
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}//aqui a função includes(), retorna verdadeiro se existir o nome da tag dentro do estado caso contrario retorna false
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}    
                            />
                        ))
                    } 
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
};