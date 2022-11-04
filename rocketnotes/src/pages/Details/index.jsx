import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { Container, Links, Content } from "./styles"

export function Details() {
  return (
    <Container>

      <Header />
      <main>
        <Content>
          <ButtonText title="Excluir nota"/>

          <h1>Introdução ao React</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veritatis illum beatae. Libero eum minus omnis provident quisquam, aliquid itaque tempora, reiciendis laudantium unde iure voluptatem illo quae eius modi.</p>

          <Section title="Links úteis">
            <Links>
              <li>
                <a href="#">https://www.rocketseat.com.br/</a>
              </li>
              <li>
                <a href="#">https://www.rocketseat.com.br/</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express" />
            <Tag title="nodejs" />
          </Section>

          <Button title="Voltar"/>    
        </Content>
      </main>
    </Container>
  )
}

//children está pegando tudo que está dentro do section e repassando para a pagina