import { serverError } from '../http.js'

export default (log) => (controlador) => async (any) => {
  try {
    return await controlador(any)
  } catch (error) {
    log.error(error)
    return serverError(error)
  }
}
