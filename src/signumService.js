const Context = require('./context')

class SignumService {
  #context
  constructor (context) {
    this.#context = context
  }

  async transferSigna ({ amount, recipient }) {
    console.log('transferSigna', amount, recipient)
    return Promise.resolve()
  }

  async transferToken ({ tokenId, quantity, recipient }) {
    console.log('transferToken', tokenId, quantity, recipient)
    return Promise.resolve()
  }
}

module.exports = new SignumService(Context)
