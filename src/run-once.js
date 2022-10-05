const { tipBotTaskImpl } = require('./tasks/tipbotTaskImpl');

// better using a command line argument than this dirty hack
(async () => {
  await tipBotTaskImpl()
})()
