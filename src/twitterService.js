const Context = require('./context')
const { Client } = require('twitter-api-sdk')

class TwitterApiError extends Error {
  constructor (msg) {
    super(`[TWITTER API ERROR] - ${msg}`)
  }
}

const withErrorHandling = async (twitterCall) => {
  try {
    const { data, errors } = await twitterCall()
    if (errors && errors.length) {
      throw new Error(errors[0].detail)
    }
    return data
  } catch (e) {
    throw new TwitterApiError(e.message)
  }
}

class TwitterService {
  #context
  #twitter

  constructor (context) {
    this.#context = context
    this.#twitter = new Client(context.Twitter.BearerToken)
  }

  async getUserId (userName) {
    const result = await withErrorHandling(
      () => this.#twitter.users.findUserByUsername(userName)
    )
    return result.id
  }

  async readDirectMessages () {
    return Promise.resolve()
  }

  async readMentionedMessages () {
    return Promise.resolve()
  }

  async answerDirectMessage () {
    return Promise.resolve()
  }
}

module.exports = {
  twitterService: new TwitterService(Context)
}
