const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.sizeStream = 0;
  }

  _transform(chunk, encoding, callback) {
    this.sizeStream += chunk.length
    callback(this.sizeStream > this.limit ? new LimitExceededError() : null, chunk);
  }
}

module.exports = LimitSizeStream;
