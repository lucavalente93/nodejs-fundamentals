// O que é?
// 'Buffer' é uma representação de um espaço na memória do computador,
// Usado para transitar dados de forma (muito) rápida. Os dados são armazenados
// Para serem tratados e logo removidos.
// Resumidamente, é uma maneira de salvar e ler na memória de forma binária,
// o que o torna MUITO performático ao invés de um texto ou uma string.

const buf = Buffer.from("ok")

console.log(buf.toJSON())