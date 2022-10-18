
const ErrorCodes = {
  NoKnownCommandFound: 1,
  UnsupportedCommand: 2,
  InvalidCommandArgs: 3
}

class MessageParseError extends Error {
  code
  constructor (msg, code) {
    super(msg)
    this.code = code
  }
}

class InvalidArgsError extends MessageParseError {
  constructor (command, detail = 'Generic Parse Error') {
    super(`Invalid arguments for command [${command}]: ${detail}`, ErrorCodes.InvalidCommandArgs)
  }
}

function identifyCommand (message) {
  const result = /!(?<cmd>tip|help|deposit|market|withdraw|balance|bal|fees|terms)/igm.exec(message)
  if (!result) {
    throw new MessageParseError('No command found', ErrorCodes.NoKnownCommandFound)
  }
  return result.groups.cmd
}

const SupportedTickers = ['SIGNA', 'TRT']
const SupportedMarketTickers = ['SIGNA', 'BTC', 'ETH']

function getTipArguments (message) {
  const result = new RegExp(`!tip\\s(?<amount>\\d+(\\.\\d{0,8})?)\\s(?<ticker>${SupportedTickers.join('|')})(?<users>(\\s@\\w{0,15})+)`, 'igm').exec(message)
  if (result) {
    const { amount, ticker, users } = result.groups

    return {
      amount,
      ticker,
      recipients: users.trim().split(' ')
    }
  }

  throw new InvalidArgsError('tip')
}

function getWithdrawArguments (message) {
  const result = new RegExp(`!withdraw\\s(?<amount>\\d+(\\.\\d{0,8})?)\\s(?<ticker>${SupportedTickers.join('|')})`, 'igm').exec(message)
  if (result) {
    const { amount, ticker } = result.groups
    return {
      amount,
      ticker
    }
  }

  throw new InvalidArgsError('withdraw')
}

function getDepositArguments (message) {
  const result = new RegExp(`!deposit\\s(?<ticker>${SupportedTickers.join('|')})`, 'igm').exec(message)
  if (result) {
    const { ticker } = result.groups
    return {
      ticker
    }
  }

  throw new InvalidArgsError('deposit')
}

function getMarketArguments (message) {
  const result = new RegExp(`!market\\s(?<ticker>${SupportedMarketTickers.join('|')})`, 'igm').exec(message)
  if (result) {
    const { ticker } = result.groups
    return {
      ticker
    }
  }

  throw new InvalidArgsError('market')
}

function getArguments (command, message) {
  switch (command) {
    case 'tip':
      return getTipArguments(message)
    case 'deposit':
      return getDepositArguments(message)
    case 'withdraw':
      return getWithdrawArguments(message)
    case 'market':
      return getMarketArguments(message)
    case 'help':
    case 'balance':
    case 'bal':
    case 'fees':
    case 'terms':
      return undefined // no args required;
    default:
      throw new MessageParseError(`Unsupported command [${command}]`, ErrorCodes.UnsupportedCommand)
  }
}

function parseMessage (message) {
  const command = identifyCommand(message)
  const args = getArguments(command, message)
  return {
    command,
    args
  }
}

module.exports = {
  parseMessage,
  ErrorCodes,
  MessageParseError,
  InvalidArgsError
}
