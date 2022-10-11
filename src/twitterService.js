const Context = require('./context')

const { TwitterApi } = require('twitter-api-v2')

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

  constructor (context) {
    this.#context = context

    const client = new TwitterApi({
      appKey: this.#context.Twitter.ConsumerKey,
      appSecret: this.#context.Twitter.ConsumerSecret,
      accessToken: this.#context.Twitter.AccessToken,
      accessSecret: this.#context.Twitter.AccessTokenSecret
    })

    this.v1Client = client.v1
    this.v2Client = client.v2
  }

  async getUserId (userName) {
    const result = await withErrorHandling(
      () => this.v2Client.userByUsername(userName)
    )
    return result.id
  }

  // might not be needed
  async getDirectMessages (id) {
    const result = await withErrorHandling(
      () => this.v1Client.getDmEvent(id)
    )
    return result
  }

  async listDirectMessages () {
    const result = await this.v1Client.listDmEvents()
    return result
  }

  async readMentionedMessages () {
    return Promise.resolve()
  }

  async answerDirectMessage (id, text) {
    const result = await withErrorHandling(
      () => this.this.v1Client.sendDm({
        recipient_id: id,
        text
      })
    )
    return result.id
  }
}

module.exports = {
  twitterService: new TwitterService(Context)
}
