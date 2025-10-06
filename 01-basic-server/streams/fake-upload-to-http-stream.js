// Importa a classe Readable do módulo 'stream' do Node.js.
// Readable é usada para criar streams que GERAM dados.
import { Readable } from 'node:stream'


// Classe que gera números de 1 a 100, um por segundo.
class OneToHundredStream extends Readable {
  index = 1  // valor inicial

  // Método chamado automaticamente pelo Node
  // quando alguém consome os dados dessa stream.
  _read() {
    const i = this.index++; // incrementa o contador

    // Simula uma geração lenta de dados (1 número por segundo)
    setTimeout(() => {
      if (i > 100) {
        // Quando atingir 100, sinaliza o fim da stream
        this.push(null);
      } else {
        // Converte o número atual para Buffer
        // e o envia para o consumidor da stream
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}


// Faz uma requisição HTTP POST para o servidor local
// enviando a stream como corpo (body) da requisição.
fetch('http://localhost:9394', {
  method: 'POST',

  // Corpo da requisição será a nossa stream personalizada.
  // Cada número gerado será transmitido para o servidor.
  body: new OneToHundredStream(),

  // Essa opção é obrigatória ao enviar uma stream no Node.js.
  // Define que o corpo será transmitido em modo half-duplex:
  // envia os dados em partes e só depois lê a resposta.
  duplex: 'half'
})
