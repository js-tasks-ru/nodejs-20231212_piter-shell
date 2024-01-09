const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.resStr = '';
  }

  _flush(callback) {
    callback(null, this.resStr);
  }

  _transform(chunk, encoding, callback) {
    const curChankStr = chunk.toString('utf-8')
    this.resStr += chunk.toString('utf-8')
    if (~curChankStr.indexOf(os.EOL)) {
      const arrRows = this.resStr.split(os.EOL)
      if (arrRows.length > 2) {
        arrRows.forEach(row => {
          this.push(row);
        })
        this._flush = undefined;
      } else {
        this.resStr = arrRows[1] || '';
        this.push(arrRows[0]);
      }
    }
    callback();
  }
}

module.exports = LineSplitStream;
