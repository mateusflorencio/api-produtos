export const ok = (data) => ({
  statusCode: 200,
  body: data
})

export const badRequest = (erros) => ({
  statusCode: 400,
  body: erros
})

export const serverError = (erros) => ({
  statusCode: 500,
  body: erros
})

export const notFound = (erros) => ({
  statusCode: 404,
  body: erros
})

export const unauthorized = (erros) => ({
  statusCode: 401,
  body: erros
})

export const forbidden = (erros) => ({
  statusCode: 403,
  body: erros
})

export const noContent = () => ({
  statusCode: 204
})

export const created = (data) => ({
  statusCode: 201,
  body: data
})
