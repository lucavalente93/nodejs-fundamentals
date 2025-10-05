import {Readable} from 'node::stream'

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
      const i = this.index++;
  };
}
// process.stdin.pipe(process.stdout)
