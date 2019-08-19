export class UnexpectedConsoleOutputError extends Error{
  constructor(message, consoleMessages){
    super(`${message}: ${JSON.stringify(consoleMessages, null, 2)}`)
    this.consoleMessages = consoleMessages
  }
}

export const defaultConfig = {
  onError: ({consoleMessages}) => {
    if(consoleMessages.length > 0){
      throw new UnexpectedConsoleOutputError('Unhandled console messages in test', consoleMessages)
    }
  }
}

export default function errorOnConsoleOutput(
  {
    onError = defaultConfig.onError
  } = {}
){
  let consoleMessages = []

  beforeEach(() => {
    Object.keys(global.console)
      .filter(consoleFnName => {
        return consoleFnName.charAt(0) !== '_' && typeof(global.console[consoleFnName]) === 'function'
      })
      .forEach(consoleFnName => {
        global.console[consoleFnName] = (...args) => {
          consoleMessages.push({level: consoleFnName, args})
        }
      })
  })

  afterEach(() => {
    onError({consoleMessages})
  })

  const flushConsoleMessages = () => {
    const consoleMessagesToTake = consoleMessages
    consoleMessages = []
    return consoleMessagesToTake
  }

  return flushConsoleMessages
}
