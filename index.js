class UnexpectedConsoleOutputError extends Error{
  constructor(message, consoleMessages){
    super(`${message}: ${JSON.stringify(consoleMessages, null, 2)}`)
    this.consoleMessages = consoleMessages
  }
}

const defaultConfig = {
  onError: ({consoleMessages}) => {
    if(consoleMessages.length > 0){
      throw new UnexpectedConsoleOutputError('Unhandled console messages in test', consoleMessages)
    }
  },
  filterEntries: consoleEntry => consoleEntry,
}

function errorOnConsoleOutput(
  {
    onError = defaultConfig.onError,
    filterEntries = defaultConfig.filterEntries,
  } = {}
){
  let consoleMessages = []
  const flushConsoleMessages = () => {
    const consoleMessagesToTake = consoleMessages
    consoleMessages = []
    return consoleMessagesToTake
  }

  beforeEach(() => {
    Object.keys(global.console)
      .filter(consoleFnName => {
        return consoleFnName.charAt(0) !== '_' && typeof(global.console[consoleFnName]) === 'function'
      })
      .forEach(consoleFnName => {
        global.console[consoleFnName] = (...args) => {
          const consoleEntry = {level: consoleFnName, args};
          if (filterEntries(consoleEntry)) {
            consoleMessages.push(consoleEntry)
          }
        }
      })
  })

  afterEach(() => {
    const flushedConsoleMessages = flushConsoleMessages();
    onError({consoleMessages: flushedConsoleMessages})
  })

  return flushConsoleMessages
}

module.exports = {
  UnexpectedConsoleOutputError,
  defaultConfig,
  errorOnConsoleOutput
}
