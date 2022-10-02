const Context = require("./context")

class TwitterService {
  #context;
  constructor(context) {
    this.#context = context
  }

  async readDirectMessages(){
    return Promise.resolve()
  }

  async readMentionedMessages(){
    return Promise.resolve()
  }

  async answerDirectMessage() {
    return Promise.resolve()
  }

}

module.exports = new TwitterService(Context)
