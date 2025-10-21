// O JS tem um sistema interno de propriedade e métodos privados (#),
// Impedindo que arquivos externos acessem a propriedade.



// Pra trabalhar com arquivos físicos dentro do Node, é preciso trabalhar com o módulo 
// interno do node de file system.
// Temos dois módulos:
// node:fs/promises= podemos trabalhar e usar sintaxes do novo formato de assincronismo 
// do JS (promises)
// node:fs = Mesmos métodos, com o padrão de assincronismo mais antigo (callbacks).

// !! A diferença principal é no node:fs/promises, não temos métodos de streaming !!
// Portanto, caso formos lidar com streaming (ler / escrever arquivos por partes),
// Não podemos utilizar node:fs/promises.
import fs from 'node:fs/promises'

// Objeto que retorna exatamente o caminho pro arquivo database.
const databasePath = new URL('../db.json', import.meta.url)


export class Database {
  #database = {}
  

  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }
// O node, por padrão, sempre vai levar em conta o local de execução da aplicação
// como o local onde ele vai criar os arquivos.
// As funções `__dirname` e `__filename`, que retornam o nome do diretório e arquivo
// (respectivamente), não existem mais a partir do momento que utilizamos os ES Modules.
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

// Agora, a localização do nosso arquivo de banco de dados está relativa ao arquivo database.js,
// E não mais um valor relativo aonde o script do node está sendo executado, como anteriormente.

  select(table) {
    const data = this.#database[table] ?? []
    
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = data
    }
    
    this.#persist()
    
    return data
  }
}