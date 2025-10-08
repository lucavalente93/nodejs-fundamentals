// Importa o módulo HTTP nativo do Node.js
import http from 'node:http'

// Importa a classe Transform para criar transformer streams
import { Transform } from 'node:stream'


// Classe que inverte o sinal de cada número recebido
class InverseNumberStream extends Transform {
  // O método _transform() é chamado a cada chunk (parte) recebido.
  _transform(chunk, encoding, callback) {
    // Converte o buffer recebido em número e inverte o sinal
    const transformed = Number(chunk.toString()) * -1

    // Exibe o valor transformado no console do servidor
    console.log(transformed)

    // Envia o valor transformado para o próximo destino do pipeline
    callback(null, Buffer.from(String(transformed))) 
  }
}


// Cria um servidor HTTP que escuta requisições
// A requisição (req) é uma stream Readable
// O response (res) é uma stream Writable
const server = http.createServer(async(req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // Une vários chunks em um único "pedaço" 
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
  
  
})


// O servidor começa a escutar na porta 9394
server.listen(9394)
