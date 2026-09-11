# Documentação Geral — Exclusive E-Commerce

**Projeto:** Exclusive E-Commerce  
**Metodologia de gestão:** Scrum  
**Scrum Master e responsável pela documentação:** Eduarda Capelas Barbosa  
**Data:** 09 de setembro de 2026

---

## 1. Visão geral

O **Exclusive E-Commerce** é uma aplicação de comércio eletrônico desenvolvida para permitir que usuários naveguem por uma vitrine de produtos, adicionem itens ao carrinho, realizem login e avancem até a confirmação do pagamento.

O projeto integra uma interface web desenvolvida pelo time de Front-end a uma API REST desenvolvida pelo time de Back-end. Os dados dos produtos são persistidos em uma planilha Excel e disponibilizados ao Front-end no formato JSON.

---

## 2. Integrantes do projeto

### Front-end

- Bridget Caroline Monay Bolivar da Costa
- Camila dos Santos Vieira
- Geovanna Rodrigues Petarnella de Oliveira
- Isabelle Santos Correia
- Maria Gabriela Alves Macedo

### Back-end

- Gabriel da Silva Barbosa
- Gabriel Dornelas Assis da Silva
- João Lucas Palik Valerio
- João Tenório Da Silva Bezerra
- Théo Gisondi Baptista

### Documentação e Scrum Master

- Beatriz Ferrari
- Maria Eduarda Ferreira Irineu Sarrico
- Gabriel Caique Zerbinato Alcantara

- Eduarda Capelas Barbosa

---

## 3. Organização Scrum

O projeto segue princípios do Scrum para organizar o desenvolvimento e a entrega incremental da aplicação.

| Papel | Responsabilidade |
|---|---|
| Product Owner | Define as prioridades de negócio, funcionalidades e critérios de aceite do produto. |
| Scrum Master | Eduarda Capelas Barbosa; conduz o processo Scrum, acompanha impedimentos e mantém a documentação do projeto. |
| Time de Front-end | Implementa telas, componentes, estilos, responsividade, navegação e integração visual. |
| Time de Back-end | Implementa a API, as regras de persistência e a integração de dados com o Front-end. |

### Eventos Scrum

- **Sprint Planning:** definição das prioridades e atividades que serão desenvolvidas na Sprint.
- **Daily Scrum:** acompanhamento diário do andamento das tarefas, próximos passos e impedimentos.
- **Sprint Review:** demonstração das funcionalidades concluídas para validação.
- **Sprint Retrospective:** análise dos pontos positivos, dificuldades e melhorias para a próxima Sprint.

---

## 4. Fluxo de navegação

O fluxo principal do usuário no e-commerce é composto por quatro etapas:

| Etapa | Tela | Descrição |
|---|---|---|
| 1 | Homepage | O usuário visualiza promoções, categorias, produtos e o catálogo. |
| 2 | Carrinho | O usuário confere os produtos selecionados, quantidades e valores. |
| 3 | Login | O usuário realiza login ou cria uma conta para continuar a compra. |
| 4 | Pagamento | O usuário informa endereço, seleciona a forma de pagamento e confirma o pedido. |

A sequência de navegação prevista é: **Homepage → Carrinho → Login → Pagamento**.

---

## 5. Front-end

### Materiais utilizados

O protótipo visual e o fluxo de navegação foram planejados no Figma:

[Arquivo do projeto no Figma](https://www.figma.com/design/25N6K9iG9lJz4zrmdEteA6/Projetos?node-id=78-2)

O Figma deve ser utilizado como referência para layout, espaçamentos, componentes, tipografia, identidade visual e fluxo das telas.

### Paleta de cores

| Cor | Código hexadecimal | Uso previsto |
|---|---|---|
| Escura | `#1D1616` | Cabeçalhos, rodapés, textos em destaque e contraste visual. |
| Vermelha | `#D84040` | Botões, chamadas para ação, promoções, destaques e indicadores. |
| Cinza claro | `#EEEEEE` | Fundos, áreas neutras e divisórias. |

A cor vermelha deve ser priorizada em ações relevantes, como os botões **Comprar**, **Finalizar compra** e **Confirmar pagamento**.

### Responsabilidades do time

- Desenvolver a Homepage, o Carrinho, a tela de Login e a tela de Pagamento.
- Aplicar a paleta de cores e a identidade visual definidas no protótipo.
- Criar e reutilizar componentes, como botões, campos de formulário, cartões de produto, menus e indicadores.
- Implementar responsividade e boa experiência de navegação.
- Integrar o catálogo e os dados do carrinho com a API do Back-end.
- Validar a implementação contra o protótipo antes do encerramento de cada Sprint.

---

## 6. Back-end

### Materiais utilizados

O time de Back-end utilizou o **Claude** como ferramenta de apoio ao desenvolvimento. A aplicação foi estruturada em Python com Flask e utiliza uma planilha Excel como armazenamento dos produtos.

**Projeto/repositório:** `software-engeneering/atividades-luiz/shopping_backend`

### Estrutura do projeto

```text
shopping_backend/
├── README.md
├── app.py
├── assets/
│   └── images/
│       ├── gamepad.jpg
│       ├── gpu.jpg
│       ├── iphone-banner.jpg
│       ├── keyboard.jpg
│       └── monitor.jpg
├── data/
│   ├── criar_planilha.py
│   └── produtos.xlsx
├── index.css
├── index.html
├── index.js
└── requirements.txt
```

### Tecnologias

| Tecnologia | Finalidade |
|---|---|
| Python | Linguagem principal do Back-end. |
| Flask 3.0.3 | Framework para criação do servidor e da API REST. |
| Flask-CORS 4.0.1 | Permite a comunicação entre Front-end e Back-end em origens diferentes. |
| OpenPyXL 3.1.5 | Leitura e escrita dos dados na planilha Excel. |
| Excel | Persistência simples dos produtos cadastrados. |
| Claude | Apoio ao desenvolvimento e à organização do código. |

### Banco de dados

O arquivo `data/produtos.xlsx` é utilizado como base de dados do projeto. A planilha contém a aba `produtos` e os campos abaixo:

| Campo | Descrição |
|---|---|
| `id` | Identificador único do produto. |
| `nome` | Nome do produto. |
| `categoria` | Categoria do produto. |
| `preco` | Preço do produto. |
| `estoque` | Quantidade disponível. |
| `descricao` | Descrição comercial do produto. |
| `imagem_url` | Caminho ou endereço da imagem do produto. |

O script `criar_planilha.py` permite gerar ou restaurar a planilha com dados iniciais. O Back-end usa uma trava de execução para reduzir o risco de gravações simultâneas no arquivo.

### API REST

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Exibe a loja ou retorna informações gerais da API. |
| `GET` | `/api/produtos` | Lista os produtos cadastrados. Aceita filtros por `categoria` e `busca`. |
| `GET` | `/api/produtos/<id>` | Retorna um produto específico pelo identificador. |
| `POST` | `/api/produtos` | Cadastra um produto. |
| `PUT` | `/api/produtos/<id>` | Atualiza os dados de um produto. |
| `DELETE` | `/api/produtos/<id>` | Exclui um produto. |
| `GET` | `/api/produtos/exportar` | Baixa a planilha Excel atualizada. |
| `GET` | `/api/categorias` | Lista as categorias cadastradas. |

Exemplo de consulta com filtros:

```text
/api/produtos?categoria=Eletronicos&busca=fone
```

### Responsabilidades do time

- Desenvolver e manter a API REST.
- Ler e gravar informações na planilha `produtos.xlsx`.
- Implementar operações de criação, consulta, edição e exclusão de produtos.
- Disponibilizar produtos e categorias em JSON para consumo do Front-end.
- Garantir a exportação da planilha atualizada.
- Apoiar o Front-end na integração com os endpoints.

---

## 7. Execução do projeto

Para instalar as dependências do Back-end:

```bash
pip install -r requirements.txt
```

Para iniciar o servidor:

```bash
python app.py
```

Após a inicialização, a aplicação fica disponível em:

```text
http://localhost:5000
```

---

## 8. Critérios de aceite

O incremento do projeto será considerado aceito quando:

- O fluxo Homepage → Carrinho → Login → Pagamento estiver funcional.
- As telas estiverem visualmente alinhadas ao protótipo do Figma.
- A paleta `#1D1616`, `#D84040` e `#EEEEEE` estiver aplicada de forma consistente.
- Os produtos forem carregados dinamicamente pela API.
- As consultas, inclusões, edições e exclusões de produtos funcionarem conforme as rotas documentadas.
- O carrinho calcular corretamente subtotal, frete e total.
- Os campos de login e pagamento apresentarem as validações previstas.
- O Front-end e o Back-end estiverem integrados e testados pela equipe.

---

## 9. Melhorias futuras

Para evoluções posteriores do projeto, recomenda-se:

- Migrar a persistência de Excel para um banco de dados relacional.
- Implementar autenticação real e armazenamento seguro de credenciais.
- Criar gerenciamento de pedidos e histórico de compras.
- Integrar um serviço de pagamento real.
- Implementar testes automatizados de API e interface.
- Adicionar controle de estoque associado à finalização dos pedidos.
- Criar painel administrativo para gerenciamento dos produtos.

---

## 10. Conclusão

O Exclusive E-Commerce integra uma experiência de compra digital com uma arquitetura simples e adequada a fins acadêmicos. O projeto estabelece uma separação clara entre a camada visual, a API de produtos e a base de dados em Excel, permitindo que os times de Front-end e Back-end trabalhem de forma integrada sob acompanhamento Scrum.
