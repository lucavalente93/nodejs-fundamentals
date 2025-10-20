import http from 'node:http'
import { json } from '../streams/middlewares/json.js'
// ^^ ^^ ^^ ^^ ^^ ^^ ATENÇÃO ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ 
// ATENÇÃO: EM NODE, ao trabalhar com 'type:module' nas importações, é preciso especificar
// A extensão do arquivo (`/json.js`) nas importações do arquivo, caso contrário não será
// Possível encontrar a importação do módulo.
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module


const users = []


const server = http.createServer(async(req, res) => {
  // métodos HTTP e URL são obtidas através do parâmetro REQUEST (req):
  const method = req.method
  const url = req.url
  
  await json(req, res)
  //ou utilizando desestruturação
  // const {method, url} = req

  console.log(req.body)
  
  if (method === 'GET' && url === '/users'){
  // early return - omitindo else statement
    return res
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users'){
    const { name, email } = req.body
    users.push({
      id: 1,
      name, 
      email,
    })
    return res.writeHead(201).end()
  }

return res.writeHead(404).end()
})

server.listen(9393)
