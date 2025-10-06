import { Readable, Writable, Transform} from  'node:stream'

/**
 * OneToHundredStream: Stream do tipo Readable (fonte de dados).
 * 
 * Essa classe gera os números de 1 a 100, um por segundo.
 * 
 * O método _read() é chamado automaticamente pelo Node sempre que
 * algum consumidor (como pipe) precisa de mais dados.
 * 
 * Dentro dele, o número atual é convertido em Buffer e enviado com this.push().
 * Quando chega a 101, this.push(null) sinaliza o fim da stream.
 */

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  } 
}

/**
 * InverseNumberStream: Stream do tipo Transform (intermediária).
 * 
 * Essa stream recebe chunks de dados, transforma-os e
 * passa o resultado adiante para o próximo destino.
 * 
 * Aqui, cada número recebido é convertido em negativo.
 * 
 * O método _transform() recebe:
 *  - chunk: o pedaço de dado vindo da stream anterior
 *  - encoding: o tipo de codificação (normalmente ignorado para Buffers)
 *  - callback: função que deve ser chamada ao terminar a transformação
 */
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback){
   const transformed = Number(chunk.toString()) * -1
   callback(null, Buffer.from(String(transformed))) 
   
  }
}
/**
 * MultiplyByTenStream: Stream do tipo Writable (destino final).
 * 
 * Essa stream apenas consome os dados — não os repassa.
 * 
 * O método _write() é chamado a cada chunk recebido.
 * 
 * Aqui, ele converte o número recebido para inteiro, multiplica por 10
 * e exibe o resultado no console.
 */

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// pipeline: Readable → Transform → Writable
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())