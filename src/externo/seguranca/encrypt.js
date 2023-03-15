import bcrypt from 'bcryptjs'

export default (salt = 10) => (password) => bcrypt.hashSync(password, salt)
