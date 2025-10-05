import http from 'node:http';

const users = [];


const server = http.createServer((req, res) => {
  // métodos HTTP e URL são obtidas através do parâmetro REQUEST (req):
  const method = req.method;
  const url = req.url;
  //ou utilizando desestruturação
  // const {method, url} = req

  if (method === 'GET' && url === '/users'){
  // Early return - omitindo else statement
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com"
    });
    return res.writeHead(201).end();
  }

return res.writeHead(404).end();
});

server.listen(9393);
