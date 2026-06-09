# Cadastro de Endereço com CEP

Formulário de cadastro de endereço que busca e preenche os dados automaticamente a partir do CEP, usando a API pública [ViaCEP](https://viacep.com.br/).

Construído com **React** + **Vite**.

## Funcionalidades

- Máscara automática no campo CEP (`00000-000`)
- Busca dos dados ao sair do campo CEP (evento `blur`)
- Validação do formato (8 dígitos)
- Preenchimento automático de logradouro, bairro, cidade e UF
- Tratamento de CEP inexistente e de falhas de rede
- Mensagens de status (buscando / encontrado / erro)

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [API ViaCEP](https://viacep.com.br/)

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) 18+.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# build de produção
npm run build

# pré-visualizar o build
npm run preview
```

## Estrutura

```
cadastro-cep/
├── index.html
├── src/
│   ├── main.jsx                  # ponto de entrada
│   ├── App.jsx                   # componente raiz
│   ├── index.css                 # estilos globais
│   └── components/
│       ├── AddressForm.jsx       # formulário + lógica de busca de CEP
│       └── AddressForm.css       # estilos do formulário
└── vite.config.js
```

## Como funciona

Ao preencher o CEP e sair do campo, o componente faz uma requisição para:

```
https://viacep.com.br/ws/{cep}/json/
```

A resposta em JSON é usada para preencher os demais campos do endereço. Caso o
CEP não exista, a API retorna `{ "erro": true }`, tratado com uma mensagem ao
usuário.

## Exemplo de teste

Digite `01001-000` no campo CEP e saia do campo:

- **Logradouro:** Praça da Sé
- **Bairro:** Sé
- **Cidade:** São Paulo
- **UF:** SP
