const app = require('./src/app.js')

const PORT = 3000

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Servidor rodando em ${address}`)
})