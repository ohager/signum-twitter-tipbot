const { EDirectMessageEventTypeV1 } = require('twitter-api-v2')

const { twitterService } = require('../twitterService')

async function tipBotTaskImpl () {
  // 1. fetch all mentions for the latest period
  // 2. read all messages and parse for commands, i.e. tip, withdrawal, deposit, etc
  // 3. excute the commands.... on db, and/or on chain and respond to user.
  // 4. do the same for direct messages.... code should be pretty similar.

  // here just an example how to get a users name....
  /*
    console.log('Fetching twitter user id')
    const userName = 'furre_gard'
    const id = await twitterService.getUserId(userName)
    console.log(`got id for ${userName}`, id)
    */

  /* console.log('Sending messages to ')
   const id = '1494358888048734226'
   const res = await twitterService.answerDirectMessage(id)
   console.log(res)
  */
  /* const res = await twitterService.readDirectMessages()
  console.log(res) */

  console.log('Fetching dms')
  const result = await twitterService.listDirectMessages()
  for await (const event of result) {
    if (event.type === EDirectMessageEventTypeV1.Create) {
      console.log(event[EDirectMessageEventTypeV1.Create].message_data)
    }
  }

  /* const id1 = await twitterService.getDirectMessages("1579505177786290180")
   console.log(id1) */
}

module.exports = {
  tipBotTaskImpl
}
