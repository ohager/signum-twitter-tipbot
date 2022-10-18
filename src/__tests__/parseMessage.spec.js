const { parseMessage, InvalidArgsError } = require('../parseMessage')

describe('parseMessage', () => {
  describe('generic', () => {
    it('should throw on unknown command', () => {
      expect(() => {
        parseMessage('some unknown !command')
      }).toThrow('No command found')
    })
  })
  describe(' - help', () => {
    it('should detect help command', () => {
      expect(parseMessage('!help')).toEqual({ command: 'help' })
    })
    it('should throw on unknown command', () => {
      expect(() => {
        parseMessage('some unknown !command')
      }).toThrow('No command found')
    })
  })
  describe('- tip', () => {
    it('should extract tip command as expected for single recipient', () => {
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
    it('should extract tip command as expected for multiple users', () => {
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
})
