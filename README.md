# Projeto de API de cadastro utilizando Firebase

Este projeto é uma API Rest que permite o cadastro, listagem, atualização e exclusão de usuários. Ele utiliza o Firebase Firestore para armazenar os dados dos usuários.

## Tecnologias Utilizadas

- **Node.js**: Plataforma JavaScript no lado do servidor.
- **Express**: Framework para criar APIs em Node.js.
- **Firebase**: Plataforma para banco de dados não relacional Firestore.
- **dotenv**: Para gerenciar variáveis de ambiente e credenciais de maneira segura.

## Funcionalidades

- **Criar um novo usuário**: Adiciona um novo usuário no Firestore com informações como nome, telefone, endereço, data de contato e tipo.
- **Listar todos os usuários**: Retorna todos os usuários cadastrados no banco de dados.
- **Obter um usuário pelo ID**: Retorna as informações de um usuário específico.
- **Atualizar um usuário**: Atualiza as informações de um usuário existente.
- **Excluir um usuário**: Remove um usuário do banco de dados.

## Endpoints

### 1. Exemplo: criar um novo usuário
- **Método**: `POST`
- **Rota**: `/api/cadastros`
- **Corpo da requisição**:
```json
  {
    "nome": "João Silva",
    "telefone": "123456789",
    "endereco": "Rua Exemplo, 123",
    "data_contato": "2025-03-25",
    "tipo": "cliente"
  }
```

- **Resposta de sucesso**:
```json
  {
    "success": true,
    "message": "Usuário cadastrado com sucesso.",
    "data": {
            "id": "documentId"
        }
  }
```

- **Resposta de erro**:
```json
    {
        "success": false,
        "message": "Erro ao cadastrar usuário. Dados incompletos ou inválidos."
    }
```
### 2. Exemplo: listar todos os usuários cadastrados
- **Método**: `GET`
- **Rota**: `/api/cadastros`

- **Resposta de sucesso**:
```json
    {
        "success": true,
        "message": "Lista de usuários cadastrados:",
        "data": [
            {
                "id": "documentId1",
                "nome": "João Silva",
                "telefone": "123456789",
                "endereco": "Rua Exemplo, 123",
                "data_contato": "2025-03-25",
                "tipo": "cliente"
            },
            {
                "id": "documentId2",
                "nome": "Maria Oliveira",
                "telefone": "987654321",
                "endereco": "Avenida Exemplo, 456",
                "data_contato": "2025-03-26",
                "tipo": "fornecedor"
            }
        ]
    }
```
### 3. Exemplo: buscar um usuário pelo id
- **Método**: `GET`
- **Rota**: `/api/cadastros/:id`

- **Resposta de sucesso**:
```json
    {
        "id": "documentId",
        "nome": "João Silva",
        "telefone": "123456789",
        "endereco": "Rua Exemplo, 123",
        "data_contato": "2025-03-25",
        "tipo": "cliente"
    }
```

- **Resposta não encontrado**:
```json
    {
        "success": false,
        "message": "Cadastro não encontrado"
    }
```
### 4. Exemplo: atualizar um cadastro pelo id
- **Método**: `PUT`
- **Rota**: `/api/cadastros/:id`

- **Resposta de sucesso**:
```json
    {
        "success": true,
        "message": "Cadastro atualizado com sucesso."
    }
```

- **Resposta de erro**:
```json
    {
        "success": false,
        "message": "Erro ao atualizar cadastro."
    }
```

### 5. Exemplo: deletar um cadastro pelo id
- **Método**: `DELETE`
- **Rota**: `/api/cadastros/:id`

- **Resposta de sucesso**:
```json
    {
        "success": true,
        "message": "Cadastro excluído com sucesso."
    }
```

- **Resposta de erro**:
```json
    {
        "success": false,
        "message": "Erro ao excluir o cadastro."
    }
```