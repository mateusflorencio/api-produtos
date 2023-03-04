# Rotas

**Prefixo** /api

## Teste

> **GET**  /teste

retorna: 'OK'

## Produtos

### Salvar um produto

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

### Filtrar e buscar produto

> **GET**  /produto

Query params opcionais:

    * ord: nome do campo que quero ordenar

    * dir: asc ou desc
  
    * page: a pagina
  
    * limit: o limite
  
    * field: o campo para fazer a busca

    * search: o valor para fazer a busca

```json
{
  #sucesso
  "status": 200,
  "body": ["resultado"]
}

{
  #erro
  "status": 500,
  "body": "mensagem erro"
}

```
