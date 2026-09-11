# Exclusive E-Commerce & Backend (Python + Flask + Excel)

Aplicação completa de e-commerce com design moderno (Exclusive), navegação integrada por abas (Home, Login e Formas de Pagamento), carrinho de compras dinâmico e backend em Python (Flask) integrado a uma planilha Excel (`data/produtos.xlsx`) como banco de dados.

## Estrutura do Projeto

```
/
├── app.py                  # Backend Flask (API REST + Servidor da Loja)
├── requirements.txt        # Dependências Python (Flask, flask-cors, openpyxl)
├── index.html              # Frontend E-Commerce (Home, Login e Formas de Pagamento)
├── index.css               # Design System, layout responsivo e estilos visuais
├── index.js                # Lógica interativa, abas, carrinho e integração com a API
├── assets/
│   └── images/             # Imagens em alta resolução dos produtos e banners
│       ├── iphone-banner.jpg
│       ├── gamepad.jpg
│       ├── keyboard.jpg
│       ├── monitor.jpg
│       └── gpu.jpg
├── data/
│   ├── produtos.xlsx       # Banco de dados de produtos em Excel
│   └── criar_planilha.py   # Script para (re)gerar a planilha do zero
└── README.md               # Documentação do projeto
```

## Como Rodar o Projeto

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Inicie o servidor Flask:
```bash
python app.py
```

3. Acesse a loja no navegador:
- Abra **[http://localhost:5000](http://localhost:5000)** para acessar a loja com todas as rotas e API ativas.
- Ou dê dois cliques em `index.html` para abrir diretamente no navegador.

## Recursos do Frontend

1. **Aba Home (Vitrine & Categorias)**:
   - Banner principal do **iPhone 14 Series** com voucher de desconto.
   - Seção **Promoções (Ofertas Relâmpago)** com cronômetro em tempo real (`Dias : Horas : Minutos : Segundos`).
   - Cards de produtos em destaque com badges de desconto, favoritos (♡), visualização rápida (👁) e botão *Add To Cart*.
   - **Menu de Categorias** interativo (Celular, Computador, SmartWatch, Câmera, HeadPhones, Jogos).
   - Catálogo expansível que consome dinamicamente os produtos cadastrados na planilha Excel.
   - Rodapé institucional de 5 colunas com QR code e links sociais.

2. **Aba de Login**:
   - Tela de login limpa e centralizada com título `LOGIN` no cabeçalho.
   - Validação de e-mail e senha, opção `Lembrar-me` e login social com Google/Facebook.
   - Gatilho inteligente: se o usuário clicar em "Finalizar Compra" sem estar autenticado, é direcionado automaticamente para o login.

3. **Aba de Formas de Pagamento (Meu Carrinho / Checkout)**:
   - Cabeçalho com botão de retorno `← Voltar` e título `MEU CARRINHO`.
   - Seletor de pagamento por abas: **Cartão**, **Pix** e **Boleto**.
   - Formulário de Cartão com formatação automática em blocos de 4 dígitos e validade (`MM/AA`).
   - Resumo financeiro com **Subtotal**, **Frete** e **Total** calculados a partir dos itens do carrinho.
   - Validação de termos de compra e confirmação do pagamento.

## Rotas da API REST (Backend Flask)

| Método | Rota                        | Descrição                                              |
|--------|------------------------------|--------------------------------------------------------|
| GET    | `/`                          | Serve a loja `index.html` (ou JSON caso solicitado)    |
| GET    | `/api/produtos`              | Lista todos os produtos (filtros: `?categoria=&busca=`) |
| GET    | `/api/produtos/<id>`         | Detalhe de um produto por ID                           |
| POST   | `/api/produtos`              | Cria um novo produto na planilha                       |
| PUT    | `/api/produtos/<id>`         | Atualiza um produto existente                          |
| DELETE | `/api/produtos/<id>`         | Remove um produto da planilha                          |
| GET    | `/api/produtos/exportar`     | Baixa a planilha Excel (`produtos.xlsx`) atualizada    |
| GET    | `/api/categorias`            | Lista todas as categorias existentes                   |

## Como funciona a integração com Excel

- O backend lê e escreve diretamente no arquivo `data/produtos.xlsx` usando `openpyxl`.
- Sempre que um produto é criado, editado ou removido pela API, a planilha inteira é sincronizada.
- A rota `/api/produtos/exportar` permite baixar o arquivo Excel a qualquer instante com os dados consolidados.
