
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
  constructor (command) {
    super(`Invalid arguments for command [${command}]`, ErrorCodes.InvalidCommandArgs)
  }
}

function identifyCommand (message) {
  const result = /!(?<cmd>tip|help|deposit|rain)/igm.exec(message)
  if (!result) {
    throw new MessageParseError('No command found', ErrorCodes.NoKnownCommandFound)
  }
  return result.groups.cmd
}

function getTipArguments (message) {
  const result = /!tip\s(?<amount>\d+(\.\d{0,8})?)\s(?<ticker>SIGNA|TRT)(?<users>(\s@\w{0,15})+)/igm.exec(message)
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

function getArguments (command, message) {
  switch (command) {
    case 'tip':
      return getTipArguments(message)
    case 'help':
      return {} // no args required;
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
