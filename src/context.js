require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { LedgerClientFactory } = require('@signumjs/core')

module.exports = {
  Database: new PrismaClient(),
  Twitter: {
    BearerToken: process.env.TWITTER_API_BEARER_TOKEN,
    BotAccountId: process.env.TWITTER_BOT_ACCOUNT_ID
  },
  Signum: {
    Ledger: LedgerClientFactory.createClient({ nodeHost: process.env.SIGNUM_HOST_URL }),
    AccountSeed: process.env.SIGNUM_BOT_ACCOUNT_PHRASE
  }
}
