# Rotas

**Prefixo** /api

## Teste

> **GET**  /teste

```json
{
  "status": 200,
  "body": "ok"
}

```

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
  //sucesso
  "status": 201,
  "body": {
    "id": "string"
  }
}

{
  //erro caso campo seja inválido
  "status": 400, 
  "body": {
    "campo": "inválido"
  }
}
```

---

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
  //sucesso
  "status": 200,
  "body": ["resultado"]
}

```

## Erro No Servidor ou Afins

```json

{
  //erro
  "status": 500,
  "body": "mensagem erro"
}

```
