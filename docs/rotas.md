# Rotas

**Prefixo** /api

## Teste

> **GET**  /teste

retorna: 'OK'

## Produtos

> **POST**  /produto

body:

```json
{
  "nome": "string",
  "descricao": "string",
  "preco": "float"
}

```

retornar:

```json
{
  "status": 201,
  "body": {
    "id": "string"
  }
}
```
