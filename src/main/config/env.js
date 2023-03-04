import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

export default {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL
}
