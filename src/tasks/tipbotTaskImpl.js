const { twitterService } = require('../twitterService')

async function tipBotTaskImpl () {
  // 1. fetch all mentions for the latest period
  // 2. read all messages and parse for commands, i.e. tip, withdrawal, deposit, etc
  // 3. excute the commands.... on db, and/or on chain and respond to user.
  // 4. do the same for direct messages.... code should be pretty similar.

  // here just an example how to get a users name....
  console.log('Fetching twitter user id')
  const userName = 'ohager5'
  const id = await twitterService.getUserId(userName)
  console.log(`got id for ${userName}`, id)
}

module.exports = {
  tipBotTaskImpl
}
