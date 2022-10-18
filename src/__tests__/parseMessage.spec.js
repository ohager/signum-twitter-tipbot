const { parseMessage, InvalidArgsError } = require('../parseMessage')

describe('parseMessage', () => {
  describe('generic', () => {
    it('should throw on unknown command', () => {
      expect(() => {
        parseMessage('some unknown !command')
      }).toThrow('No command found')
    })
  })
  describe(' - no args commands', () => {
    it('should detect help command', () => {
      expect(parseMessage('!help')).toEqual({ command: 'help' })
    })
    it('should detect balance | bal command', () => {
      expect(parseMessage('!balance')).toEqual({ command: 'balance' })
      expect(parseMessage('!bal')).toEqual({ command: 'bal' })
    })
    it('should detect fees command', () => {
      expect(parseMessage('!fees')).toEqual({ command: 'fees' })
    })
    it('should detect terms command', () => {
      expect(parseMessage('!terms')).toEqual({ command: 'terms' })
    })
  })
  describe('- tip', () => {
    it('should extract withdraw command as expected for single recipient', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip 100 TRT @teemo and some more text     '
      const parsed = parseMessage(testMessage)
      expect(parsed).toEqual({
        command: 'tip',
        args: {
          amount: '100',
          ticker: 'TRT',
          recipients: ['@teemo']
        }
      })
    })
    it('should extract withdraw command as expected for multiple users', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip 100.234 SIGNA @teemo @ohager5 @underpants_42 @shefass and some more text     '
      const parsed = parseMessage(testMessage)
      expect(parsed).toEqual({
        command: 'tip',
        args: {
          amount: '100.234',
          ticker: 'SIGNA',
          recipients: ['@teemo', '@ohager5', '@underpants_42', '@shefass']
        }
      })
    })
    it('should throw error for incomplete arguments - no amount', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip SIGNA @teemo @ohager5 @underpants_42 @shefass and some more text     '
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for incomplete arguments - invalid ticker', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip 10 FOOBAR @teemo @ohager5 @underpants_42 @shefass and some more text     '
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for negative amount', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip -10 SIGNA @teemo @ohager5 @underpants_42 @shefass and some more text     '
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for incomplete arguments - no user ', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip 10 TRT and some more text     '
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
  })
  describe('- withdraw', () => {
    it('should extract withdraw command ', () => {
      const parsed = parseMessage('I want my money !withdraw 100 TRT now')
      expect(parsed).toEqual({
        command: 'withdraw',
        args: {
          amount: '100',
          ticker: 'TRT'
        }
      })
    })
    it('should throw error for incomplete arguments - no ticker', () => {
      expect(() => {
        parseMessage('I want my money !withdraw 100 now')
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for incomplete arguments - invalid ticker', () => {
      expect(() => {
        parseMessage('I want my money !withdraw 100 BTC now')
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for negative amount', () => {
      expect(() => {
        parseMessage('I want my money !withdraw -100 BTC now')
      }).toThrow(InvalidArgsError)
    })
  })
  describe('- deposit', () => {
    it('should extract deposit command as expected - SIGNA', () => {
      const testMessage = 'I want to !deposit SIGNA'
      const parsed = parseMessage(testMessage)
      expect(parsed).toEqual({
        command: 'deposit',
        args: {
          ticker: 'SIGNA'
        }
      })
    })
    it('should extract deposit command as expected - TRT', () => {
      const testMessage = 'I want to !deposit TRT'
      const parsed = parseMessage(testMessage)
      expect(parsed).toEqual({
        command: 'deposit',
        args: {
          ticker: 'TRT'
        }
      })
    })
    it('should throw error for incomplete arguments - no ticker', () => {
      const testMessage = 'I want to !deposit'
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for incomplete arguments - unsupported ticker', () => {
      const testMessage = 'I want to !deposit FOOK'
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
  })
  describe('- market', () => {
    it('should extract market command as expected - SIGNA', () => {
      const parsed = parseMessage('Show me the !market SIGNA')
      expect(parsed).toEqual({
        command: 'market',
        args: {
          ticker: 'SIGNA'
        }
      })
    })
    it('should extract market command as expected - BTC', () => {
      const parsed = parseMessage('Show me the !market BTC')
      expect(parsed).toEqual({
        command: 'market',
        args: {
          ticker: 'BTC'
        }
      })
    })
    it('should throw error for incomplete arguments - no ticker', () => {
      const testMessage = 'I want to !market'
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
    it('should throw error for incomplete arguments - unsupported ticker', () => {
      const testMessage = 'I want to !market TRT'
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
  })
})
