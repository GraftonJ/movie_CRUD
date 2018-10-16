//Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movies-dev'
  },
  test: {},
  production: {
    client: 'g',
    connection: process.env.DATABASE_URL
  }
}
