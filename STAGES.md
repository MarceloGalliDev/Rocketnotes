Stage 1
- npm create vite@latest
- Apagar arquivos desnecessários
- Criar pastas de organização, como pages, assets ...
- Criar arquivos de estilizações globais
- Adicionar fonts e colors no global

Stage 2
- Criação dos componentes
    - Header
    - Section
    - Button
    - ButtonText
    - Tag

Stage 3
- Criação das pages

Stage 4
- Criação das Routes
- Routes Auth
- Routes App


Observação
- Um componente retorna somente um unico elemento, então usamos o fragment (<> </>), assim temos um componentes que retorna varios elementos dentro de um fragment
- Cada arquivo possui sua style pessoal, a pasta styles é para styles globais


Ensinamentos
- exemplo de função

function sum(a, b){
    return a + b;
}
const result = sum(7, 3);

dentro da arrow function temos uma auto-retorno, pois a função chama retorna a si mesma
const result = (7, 3) => {
    return a + b;
}

- exemplo de props em componentes
passamos como propriedade o title, que foi desestruturado
 export function Button({ title }){
    return (
        <Container type= "button">
            {title}
        </Container>
    )
}

- ...rest, é quando temos muitas propriedades para serem passadas como parâmetros, logo usamos o rest operator

- children, significa que o componente é a mesma estrutura mas o conteúdo é diferente

- drop drilling - para verificação de login, logo utilizaremos o contexto para manuseio de rota
- contexto - podemos compartilhar com outros componentes

 - MyContext.Provider estou colocando em toda minha aplicação o email pela propriedade
 - context consigo colocar a disponibilidade de qualquer propriedade na minha aplicação

 - HOOKS
    - usado para encapsulamento de funções, sem necessidade de criar uma classe
    - usado para mudanaç de estado, utilizando o useState e useEffect
    