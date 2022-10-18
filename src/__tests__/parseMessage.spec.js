const { parseMessage, InvalidArgsError } = require('../parseMessage')

describe('parseMessage', () => {
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
    it('should throw error for incomplete arguments', () => {
      const testMessage = ' some weird message with 💔 and @mentions     inbetween where I want to !tip SIGNA @teemo @ohager5 @underpants_42 @shefass and some more text     '
      expect(() => {
        parseMessage(testMessage)
      }).toThrow(InvalidArgsError)
    })
  })
})
