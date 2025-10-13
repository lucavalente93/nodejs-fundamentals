import http from 'node:http'

const users = []


const server = http.createServer(async(req, res) => {
  // métodos HTTP e URL são obtidas através do parâmetro REQUEST (req):
  const method = req.method
  const url = req.url
  //ou utilizando desestruturação
  // const {method, url} = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }
  
  // Se o corpo da requisição não existir, retorne nada.
  try {
    //Transformando o texto do body em JSON  
    req.body = JSON.parse(Buffer.concat(buffers).toString())
   // Se der erro (corpo vazio) não existir, não tenha body.
  } catch {
    req.body = null
  }

  console.log(req.body)
  
  if (method === 'GET' && url === '/users'){
  // early return - omitindo else statement
    return res
    .setHeader('Content-type', 'application/json')
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
