// O JS tem um sistema interno de propriedade e métodos privados (#),
// Impedindo que arquivos externos acessem a propriedade.
export class Database {
  #database = {}

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
    
    return data;
  }
}